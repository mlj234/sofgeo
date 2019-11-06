import { Injectable, HttpService, Inject } from '@nestjs/common';
import { GeolocationRepository } from '../repository/geolocation-repository';
import { BehaviorSubject } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import whois = require('node-xwhois');
import {
  getGeolocation,
  getDnsName,
  getDnsPromise,
  testIfIpExist,
  testIfDomain,
} from './helpers/service.helper';
import { isValidIp } from './helpers/validators.helper';
import { GeolocationEntity } from '../../database/entities/geolocation.entity';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { RepositoryService } from '../repository/repository/repository.service';
import { convertToDto } from './helpers/converters.helper';

@Injectable()
export class GeolocationService {
  private getGeoLocation: any;
  constructor(
    private readonly http: HttpService,
    private readonly repo: RepositoryService,
  ) {
    this.getGeoLocation = getGeolocation(this.http);
  }

  public async add(address: string) {
    let value: GeolocationEntity;
    if (isValidIp(address)) {
      await testIfIpExist(this.repo, address);
      value = await this.getGeoLocation(
        await getDnsPromise(address),
      ).toPromise();
    } else {
      await testIfDomain(this.repo, address);
      value = await this.getGeoLocation(address).toPromise();
      if (value.ip === undefined) {
        return convertToDto(value);
      }
    }

    return convertToDto(await this.repo.addGeo(value));
  }

  public async get(id: number) {
    return convertToDto(await this.repo.findById(id));
  }

  public delete(id: number) {
    return this.repo.delete(id);
  }
}

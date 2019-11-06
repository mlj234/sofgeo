import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, Repository, createQueryBuilder } from 'typeorm';
import { GeolocationEntity } from '../../../database/entities/geolocation.entity';
import { DomainNames } from '../../../database/entities/domains-name.entity';
import { DatabaseException } from '../../../shared/Exceptions/database.exception';

@Injectable()
export class RepositoryService {
  private geolocation: Repository<GeolocationEntity>;
  private domains: Repository<DomainNames>;
  constructor(
    @InjectConnection('geolocation')
    private readonly connection: Connection,
  ) {
    this.geolocation = connection.getRepository(GeolocationEntity);
    this.domains = connection.getRepository(DomainNames);
  }

  private async updateGeo(geo: GeolocationEntity, current: GeolocationEntity) {
    return this.geolocation.save(this.geolocation.merge(current, geo));
  }

  public async addGeo(geo: GeolocationEntity) {
    try {
      const current = await this.findByIp(geo.ip);
      if (current !== undefined) {
        return this.updateGeo(geo, current);
      }
      return this.geolocation.save(geo);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  public findById(idx: number): Promise<GeolocationEntity> {
    return this.geolocation.findOne({ where: { id: idx } });
  }

  public findByIp(address: string): Promise<GeolocationEntity> {
    return this.geolocation.findOne({ where: { ip: address } });
  }

  public async findByDomain(name: string): Promise<GeolocationEntity> {
    return await this.geolocation
      .createQueryBuilder('geolocation')
      .leftJoinAndSelect('geolocation.domains', 'domains')
      .where('domains.domain = :domain', { domain: name })
      .andWhere('geolocation.id = domains.geolocationId')
      .getOne();
  }

  public delete(id: number) {
    return this.geolocation.delete(id);
  }
}

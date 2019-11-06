import { HttpService, HttpException } from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';
import { GeolocationEntity } from '../../../database/entities/geolocation.entity';
import { AxiosResponse } from 'axios';
import * as R from 'ramda';
import { Observable } from 'rxjs';
import dns = require('dns');
import { DomainNames } from '../../../database/entities/domains-name.entity';
import { plainToClass } from 'class-transformer';
import { GeolocationRepository } from '../../repository/geolocation-repository';
import { RepositoryService } from '../../repository/repository/repository.service';
import { AlreadyExists } from '../../../shared/Exceptions/already-exists.exception';

const ACCESS_KEY = 'aa994a93d6978db8bb593600e960da1f';
const getUrl = (url: string) =>
  `http://api.ipstack.com/${url}?access_key=${ACCESS_KEY}`;

export const getGeolocation = R.curry(
  (http: HttpService, urladdress: string) => {
    return http.get(getUrl(urladdress)).pipe(
      map((result: AxiosResponse) => {
        if (result.data.type === null) {
          return {
            id: undefined,
            ip: undefined,
            data: JSON.stringify(result.data),
            domains: undefined,
          } as GeolocationEntity;
        }

        return {
          id: undefined,
          ip: result.data.ip,
          data: JSON.stringify(result.data),
          domains: [{ id: undefined, domain: urladdress } as DomainNames],
        } as GeolocationEntity;
      }),
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  },
);

export const getDnsName = (ip: string): Observable<any> => {
  return new Observable(subscriber => {
    dns.reverse(ip, (err, domains) => {
      if (err != null) {
        subscriber.error(err);
      }
      // subscriber.next(domains[0]);
      domains.forEach(domain => {
        dns.lookup(domain, er => {
          if (er !== null && er !== undefined) {
            subscriber.error(er);
          } else {
            subscriber.next(domain);
          }
        });
      });
    });
  });
};

export const getDnsPromise = (ip: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    dns.reverse(ip, (err, domains) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(domains[0]);
      }
    });
  });
};

export const testIfIpExist = async (
  repo: RepositoryService,
  address: string,
) => {
  if (repo.findByIp(address) !== undefined) {
    return Promise.reject(new AlreadyExists());
  }
};

export const testIfDomain = async (repo: RepositoryService, domain: string) => {
  const dd = await repo.findByDomain(domain);
  if ((await repo.findByDomain(domain)) !== undefined) {
    return Promise.reject(new AlreadyExists());
  }
};

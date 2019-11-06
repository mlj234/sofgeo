import { IUrl } from '../../models/url.model';
import extractDomain from 'extract-domain';
import { GeolocationEntity } from '../../../database/entities/geolocation.entity';
import { GeolocationDto } from '../../models/geolocation.dto';
import { NotFound } from '../../../shared/Exceptions/not-found.exception';
import { NotFoundException } from '@nestjs/common';
const Ipaddress = require('ip-address');

export const getUrlIp = (url: string): IUrl => {
  const address = new Ipaddress(url);
  if (address.isValid()) {
    return { urlIp: url, isUrl: false };
  } else {
    return { urlIp: extractDomain(url), isUrl: true };
  }
};

export const convertToDto = (entity: GeolocationEntity): GeolocationDto => {
  if (entity === undefined) {
    throw new NotFoundException();
  }
  const geoDto = new GeolocationDto();
  geoDto.id = entity.id;
  geoDto.ip = entity.ip;
  if (entity.domains !== undefined) {
    geoDto.domains = [];
    entity.domains.forEach(d => {
      geoDto.domains.push(d.domain);
    });
  }

  geoDto.data = JSON.parse(entity.data);
  return geoDto;
};

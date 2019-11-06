import { Repository, InsertResult, EntityRepository } from 'typeorm';
import { GeolocationEntity } from '../../database/entities/geolocation.entity';
import { Injectable } from '@nestjs/common';

@EntityRepository(GeolocationEntity)
export class GeolocationRepository extends Repository<GeolocationEntity> {
  public addGeo(
    entity: GeolocationEntity,
  ): Promise<GeolocationEntity | undefined> {
    return this.save(entity);
  }

  public findByIp(address: string): Promise<GeolocationEntity> {
    return this.findOne({ where: { ip: address } });
  }
}

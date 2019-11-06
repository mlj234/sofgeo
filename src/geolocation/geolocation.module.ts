import { Module, HttpModule } from '@nestjs/common';
import { GeolocationService } from './services/geolocation.service';
import { GeolocationController } from './geolocation.controller';
import { DatabaseModule } from '../database/database.module';
import { GeolocationRepository } from './repository/geolocation-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryService } from './repository/repository/repository.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [GeolocationService, RepositoryService],
  controllers: [GeolocationController],
})
export class GeolocationModule {}

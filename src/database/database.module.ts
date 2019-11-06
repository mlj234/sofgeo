import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionSetting } from './connection-setting';
import { DomainNames } from './entities/domains-name.entity';
import { GeolocationEntity } from './entities/geolocation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConnectionSetting.getDbOptions()),
    // TypeOrmModule.forFeature([GeolocationEntity, DomainNames], 'geolocation'),
  ],
})
export class DatabaseModule {}

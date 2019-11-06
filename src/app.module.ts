import { Module } from '@nestjs/common';
import { GeolocationModule } from './geolocation/geolocation.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GeolocationModule, DatabaseModule, SharedModule, AuthModule],
})
export class AppModule {}

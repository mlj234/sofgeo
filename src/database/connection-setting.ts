import { GeolocationEntity } from './entities/geolocation.entity';
import { DomainNames } from './entities/domains-name.entity';
import { User } from './entities/user.entity';

export class ConnectionSetting {
  public static getDbOptions(): any {
    return {
      name: 'geolocation',
      type: 'sqlite',
      database: './db/geolocation.DB',
      entities: [GeolocationEntity, DomainNames, User],
      logging: false,
      synchronize: true,
    };
  }
}

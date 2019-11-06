import { DomainNameDto } from './domainName.dto';

export class GeolocationDto {
  id: number;
  ip: string;
  domains: string[];
  data: any;
}

import { Validate } from 'class-validator';
import { CustomValidUrl } from '../services/helpers/validators.helper';

export class DomainNameDto {
  @Validate(CustomValidUrl)
  name: string;
}

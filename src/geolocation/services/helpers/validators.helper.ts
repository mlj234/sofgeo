const Address4 = require('ip-address').Address4;
const Address6 = require('ip-address').Address6;

import isValidDomain = require('is-valid-domain');
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export const isValidIp = (str: string): boolean => {
  const addres4 = new Address4(str);
  const address6 = new Address6(str);

  return addres4.isValid() || address6.isValid();
};

const isValidIpUrl = (str: string): boolean =>
  isValidIp(str) || isValidDomain(str);

@ValidatorConstraint({ name: 'validUrl', async: false })
export class CustomValidUrl implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return isValidIpUrl(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `The ${args.value} is not valid Domain Name or Ip address!`;
  }
}

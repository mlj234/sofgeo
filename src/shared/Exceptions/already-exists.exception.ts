import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExists extends HttpException {
  constructor() {
    super('IP address or URL already exists', HttpStatus.CONFLICT);
  }
}

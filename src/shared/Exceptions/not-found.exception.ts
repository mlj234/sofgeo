import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFound extends HttpException {
  constructor() {
    super('Not Found', HttpStatus.NOT_FOUND);
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GeolocationService } from './services/geolocation.service';
import { DomainNameDto } from './models/domainName.dto';
import { AuthGuard } from '@nestjs/passport';
import { GuardService } from '../auth/guard/service-guard.service';
@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly service: GeolocationService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'), GuardService)
  add(@Body() data: DomainNameDto) {
    return this.service.add(data.name);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), GuardService)
  get(@Param('id') id: number) {
    return this.service.get(+id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), GuardService)
  delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}

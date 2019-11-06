import { Test, TestingModule } from '@nestjs/testing';
import { ServiceGuardService } from './service-guard.service';

describe('ServiceGuardService', () => {
  let service: ServiceGuardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceGuardService],
    }).compile();

    service = module.get<ServiceGuardService>(ServiceGuardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

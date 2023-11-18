import { Test, TestingModule } from '@nestjs/testing';
import { SupermarketsValidationService } from './supermarkets-validation.service';

describe('SupermarketsValidationService', () => {
  let service: SupermarketsValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupermarketsValidationService],
    }).compile();

    service = module.get<SupermarketsValidationService>(
      SupermarketsValidationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SupermarketsController } from './supermarkets.controller';
import { SupermarketsService } from '../../services/supermarkets/supermarkets.service';
import { SupermarketsValidationService } from '../../services/supermarkets-validation/supermarkets-validation.service';
import { Repository } from 'typeorm';
import { Supermarket } from '../../../supermarkets/entities/supermarket.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../../../shared/testing-utils/typeorm-testing-config';

describe('SupermarketsController', () => {
  let controller: SupermarketsController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Supermarket>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      controllers: [SupermarketsController],
      providers: [SupermarketsService, SupermarketsValidationService],
    }).compile();

    controller = module.get<SupermarketsController>(SupermarketsController);
    repository = module.get<Repository<Supermarket>>(
      getRepositoryToken(Supermarket),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

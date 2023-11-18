import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CitiesController } from './cities.controller';
import { CitiesService } from '../../services/cities/cities.service';
import { City } from '../../entities/city.entity';
import { TypeOrmTestingConfig } from '../../../shared/testing-utils/typeorm-testing-config';
import { CitiesValidationService } from '../../services/cities-validation/cities-validation.service';

describe('CitiesController', () => {
  let controller: CitiesController;
  let repository: Repository<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      controllers: [CitiesController],
      providers: [CitiesService, CitiesValidationService],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    repository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

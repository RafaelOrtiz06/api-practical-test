import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CitiesValidationService } from './cities-validation.service';
import { TypeOrmTestingConfig } from '../../../shared/testing-utils/typeorm-testing-config';
import { City } from '../../entities/city.entity';
import {
  ErrorMessage,
  ErrorType,
} from '../../../shared/errors/business-errors';

describe('CitiesValidationService', () => {
  let service: CitiesValidationService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CitiesValidationService],
    }).compile();

    service = module.get<CitiesValidationService>(CitiesValidationService);
    repository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateCountryName should throw an exception for invalid country', async () => {
    await expect(() => {
      return service.validateCountryName('Colombia');
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_ALLOWED, 'city'),
    );
  });

  it('validateExistingCity should throw an exception for invalid city', async () => {
    await expect(() => {
      return service.validateExistingCity(undefined);
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_FOUND, 'city'),
    );
  });
});

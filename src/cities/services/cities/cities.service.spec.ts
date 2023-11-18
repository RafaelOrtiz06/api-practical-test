import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { City } from '../../entities/city.entity';
import { CitiesService } from './cities.service';
import { TypeOrmTestingConfig } from '../../../shared/testing-utils/typeorm-testing-config';
import { CreateCityDto } from '../../dto/create-city.dto';
import {
  ErrorMessage,
  ErrorType,
} from '../../../shared/errors/business-errors';
import { CitiesValidationService } from '../cities-validation/cities-validation.service';
import { allowedCountries } from '../../utils/allowed-cities';
import { UpdateCityDto } from '../../dto/update-city.dto';

describe('CitiesService', () => {
  let service: CitiesService;
  let repository: Repository<City>;
  let list: City[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CitiesService, CitiesValidationService],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    repository = module.get<Repository<City>>(getRepositoryToken(City));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    list = [];

    for (let i = 0; i < 5; i++) {
      const city: City = await repository.save({
        id: faker.string.uuid(),
        name: faker.location.city.name,
        country: allowedCountries[0],
        population: 1,
      });
      list.push(city);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new city', async () => {
    const createCityDto: CreateCityDto = {
      name: 'Buenos Aires',
      country: allowedCountries[0],
      population: 1,
    };

    const result = await service.create(createCityDto);

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(createCityDto.name);
  });

  it('create should throw an exception for invalid country', async () => {
    const createCityDto: CreateCityDto = {
      name: 'Bogota',
      country: 'Colombia',
      population: 1,
    };
    await expect(() => {
      return service.create(createCityDto);
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_ALLOWED, 'city'),
    );
  });

  it('findAll should return all cities', async () => {
    const result: City[] = await service.findAll();

    expect(result).toBeDefined();
    expect(result).toHaveLength(list.length);
  });

  it('findOne should return a city by id', async () => {
    const result: City = await service.findOne(list[0].id);

    expect(result).toBeDefined();
    expect(result.id).toBe(list[0].id);
  });

  it('findOne should throw an exception for an invalid city', async () => {
    await expect(() => {
      return service.findOne('00000000-0000-0000-0000-000000000000');
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_FOUND, 'city'),
    );
  });

  it('update should modify a city', async () => {
    const updateCityDto: UpdateCityDto = {
      name: 'La Plata',
    };

    const result: City = await service.update(list[0].id, updateCityDto);

    expect(result).toBeDefined();
    expect(result.name).toBe('La Plata');
  });

  it('update should throw an exception for an invalid city', async () => {
    await expect(() => {
      return service.update('00000000-0000-0000-0000-000000000000', {});
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_FOUND, 'city'),
    );
  });

  it('delete should remove a city', async () => {
    const id: string = list[0].id;
    await service.delete(id);

    const deletedCity = await repository.findOne({ where: { id } });

    expect(deletedCity).toBeNull();
  });

  it('delete should throw an exception for an invalid city', async () => {
    await expect(() => {
      return service.delete('00000000-0000-0000-0000-000000000000');
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_FOUND, 'city'),
    );
  });
});

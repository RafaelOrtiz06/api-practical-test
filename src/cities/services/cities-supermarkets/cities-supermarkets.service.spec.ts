import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { CitiesSupermarketsService } from './cities-supermarkets.service';
import { Repository } from 'typeorm';
import { City } from '../../entities/city.entity';
import { Supermarket } from '../../../supermarkets/entities/supermarket.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../../../shared/testing-utils/typeorm-testing-config';
import { CitiesValidationService } from '../cities-validation/cities-validation.service';
import { SupermarketsValidationService } from '../../../supermarkets/services/supermarkets-validation/supermarkets-validation.service';
import { allowedCountries } from '../../utils/allowed-cities';
import {
  ErrorMessage,
  ErrorType,
} from '../../../shared/errors/business-errors';

describe('CitiesSupermarketsService', () => {
  let service: CitiesSupermarketsService;
  let citiesRepository: Repository<City>;
  let supermarketRepository: Repository<Supermarket>;
  let citiesList: City[];
  let supermarketsList: Supermarket[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [
        CitiesSupermarketsService,
        CitiesValidationService,
        SupermarketsValidationService,
      ],
    }).compile();

    service = module.get<CitiesSupermarketsService>(CitiesSupermarketsService);
    citiesRepository = module.get<Repository<City>>(getRepositoryToken(City));
    supermarketRepository = module.get<Repository<Supermarket>>(
      getRepositoryToken(Supermarket),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await citiesRepository.clear();
    await supermarketRepository.clear();

    citiesList = [];
    supermarketsList = [];

    for (let i = 0; i < 5; i++) {
      const city: City = await citiesRepository.save({
        id: faker.string.uuid(),
        name: faker.location.city.name,
        country: allowedCountries[0],
        population: faker.number.int(),
      });
      citiesList.push(city);

      const supermarket: Supermarket = await supermarketRepository.save({
        id: faker.string.uuid(),
        name: faker.company.name(),
        longitude: faker.number.int(),
        latitude: faker.number.int(),
        webPage: faker.internet.url(),
        cities: citiesList,
      });
      supermarketsList.push(supermarket);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addSupermarketToCity should add a supermarket to a city', async () => {
    const newSupermarket: Supermarket = await supermarketRepository.save({
      id: faker.string.uuid(),
      name: faker.company.name(),
      longitude: faker.number.int(),
      latitude: faker.number.int(),
      webPage: faker.internet.url(),
    });

    const result: City = await service.addSupermarketToCity(
      citiesList[0].id,
      newSupermarket.id,
    );

    expect(result.supermarkets).toHaveLength(supermarketsList.length + 1);
  });

  it('addSupermarketToCity should throw an exception for an invalid supermarket', async () => {
    await expect(() => {
      return service.addSupermarketToCity(
        citiesList[0].id,
        '00000000-0000-0000-0000-000000000000',
      );
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_FOUND, 'supermarket'),
    );
  });

  it('addSupermarketToCity should throw an exception for an invalid city', async () => {
    await expect(() => {
      return service.addSupermarketToCity(
        '00000000-0000-0000-0000-000000000000',
        '00000000-0000-0000-0000-000000000000',
      );
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_FOUND, 'city'),
    );
  });

  it('findSupermarketsFromCity should return supermarkets from city', async () => {
    const result = await service.findSupermarketsFromCity(citiesList[0].id);

    expect(result).toBeDefined();
    expect(result).toHaveLength(supermarketsList.length);
  });

  it('findSupermarketsFromCity should throw an exception for an invalid city', async () => {
    await expect(() => {
      return service.findSupermarketsFromCity(
        '00000000-0000-0000-0000-000000000000',
      );
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_FOUND, 'city'),
    );
  });

  it('findSupermarketFromCity should return supermarket from city', async () => {
    const result = await service.findSupermarketFromCity(
      citiesList[0].id,
      supermarketsList[0].id,
    );

    expect(result).toBeDefined();
    expect(result.name).toBe(supermarketsList[0].name);
  });

  it('updateSupermarketsFromCity should update supemarkets from city', async () => {
    const result = await service.updateSupermarketsFromCity(
      citiesList[0].id,
      supermarketsList.slice(0, 2),
    );

    expect(result).toBeDefined();
    expect(result.supermarkets).toHaveLength(2);
  });

  it('updateSupermarketsFromCity should throw an exception for an invalid city', async () => {
    await expect(() => {
      return service.updateSupermarketsFromCity(
        '00000000-0000-0000-0000-000000000000',
        supermarketsList.slice(0, 2),
      );
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_FOUND, 'city'),
    );
  });

  it('deleteSupermarketFromCity should remove a supermarket from city', async () => {
    const result = await service.deleteSupermarketFromCity(
      citiesList[0].id,
      supermarketsList[0].id,
    );

    expect(result).toBeDefined();
    expect(result.supermarkets).toHaveLength(supermarketsList.length - 1);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { SupermarketsService } from './supermarkets.service';
import { SupermarketsValidationService } from '../supermarkets-validation/supermarkets-validation.service';
import { Supermarket } from '../../entities/supermarket.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../../../shared/testing-utils/typeorm-testing-config';
import { CreateSupermarketDto } from '../../dto/create-supermarket.dto';
import {
  ErrorMessage,
  ErrorType,
} from '../../../shared/errors/business-errors';
import { UpdateSupermarketDto } from 'src/supermarkets/dto/update-supermarket.dto';

describe('SupermarketsService', () => {
  let service: SupermarketsService;
  let repository: Repository<Supermarket>;
  let list: Supermarket[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SupermarketsService, SupermarketsValidationService],
    }).compile();

    service = module.get<SupermarketsService>(SupermarketsService);
    repository = module.get<Repository<Supermarket>>(
      getRepositoryToken(Supermarket),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    list = [];

    for (let i = 0; i < 5; i++) {
      const supermarket: Supermarket = await repository.save({
        id: faker.string.uuid(),
        name: faker.company.name(),
        longitude: faker.number.int(),
        latitude: faker.number.int(),
        webPage: faker.internet.url(),
      });
      list.push(supermarket);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new supermarket', async () => {
    const createSupermarketDto: CreateSupermarketDto = {
      name: faker.company.name(),
      longitude: faker.number.int(),
      latitude: faker.number.int(),
      webPage: faker.internet.url(),
    };

    const result = await service.create(createSupermarketDto);

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(createSupermarketDto.name);
  });

  it('create should throw an exception for invalid supermarket name', async () => {
    const createSupermarketDto: CreateSupermarketDto = {
      name: faker.company.name().charAt(1),
      longitude: faker.number.int(),
      latitude: faker.number.int(),
      webPage: faker.internet.url(),
    };

    await expect(() => {
      return service.create(createSupermarketDto);
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.MIN_LENGTH, 'supermarket'),
    );
  });

  it('findAll should return all supermarkets', async () => {
    const result: Supermarket[] = await service.findAll();

    expect(result).toBeDefined();
    expect(result).toHaveLength(list.length);
  });

  it('findOne should return a supermarket by id', async () => {
    const result: Supermarket = await service.findOne(list[0].id);

    expect(result).toBeDefined();
    expect(result.id).toBe(list[0].id);
  });

  it('findOne should throw an exception for an invalid supermarket', async () => {
    await expect(() => {
      return service.findOne('00000000-0000-0000-0000-000000000000');
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_FOUND, 'supermarket'),
    );
  });

  it('update should modify a supermarket', async () => {
    const updateSupermarketDto: UpdateSupermarketDto = {
      name: faker.company.name(),
    };

    const result: Supermarket = await service.update(
      list[0].id,
      updateSupermarketDto,
    );

    expect(result).toBeDefined();
    expect(result.name).toBe(updateSupermarketDto.name);
  });

  it('update should throw an exception for an invalid supermarket', async () => {
    await expect(() => {
      return service.update('00000000-0000-0000-0000-000000000000', {});
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_FOUND, 'supermarket'),
    );
  });

  it('delete should remove a supermarket', async () => {
    const id: string = list[0].id;
    await service.delete(id);

    const deletedCity = await repository.findOne({ where: { id } });

    expect(deletedCity).toBeNull();
  });

  it('delete should throw an exception for an invalid supermarket', async () => {
    await expect(() => {
      return service.delete('00000000-0000-0000-0000-000000000000');
    }).rejects.toHaveProperty(
      'message',
      ErrorMessage(ErrorType.NOT_FOUND, 'supermarket'),
    );
  });
});

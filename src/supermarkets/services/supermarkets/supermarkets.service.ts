import { Injectable } from '@nestjs/common';

import { CreateSupermarketDto } from '../../dto/create-supermarket.dto';
import { UpdateSupermarketDto } from '../../dto/update-supermarket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supermarket } from '../../entities/supermarket.entity';
import { Repository } from 'typeorm';
import { SupermarketsValidationService } from '../supermarkets-validation/supermarkets-validation.service';

@Injectable()
export class SupermarketsService {
  constructor(
    @InjectRepository(Supermarket)
    private readonly supermarketRespository: Repository<Supermarket>,

    private readonly supermarketValidation: SupermarketsValidationService,
  ) {}

  async create(
    createSupermarketDto: CreateSupermarketDto,
  ): Promise<Supermarket> {
    await this.supermarketValidation.validateName(createSupermarketDto.name);

    return await this.supermarketRespository.save(createSupermarketDto);
  }

  async findAll(): Promise<Supermarket[]> {
    return await this.supermarketRespository.find({ relations: ['cities'] });
  }

  async findOne(id: string): Promise<Supermarket> {
    const supermarket = await this.supermarketRespository.findOne({
      where: { id },
      relations: ['cities'],
    });

    await this.supermarketValidation.validateExistingSupermarket(supermarket);

    return supermarket;
  }

  async update(
    id: string,
    updateSupermarketDto: UpdateSupermarketDto,
  ): Promise<Supermarket> {
    const supermarket = await this.supermarketRespository.findOne({
      where: { id },
      relations: ['cities'],
    });

    await this.supermarketValidation.validateExistingSupermarket(supermarket);

    return this.supermarketRespository.save({
      ...supermarket,
      ...updateSupermarketDto,
    });
  }

  async delete(id: string) {
    const supermarket = await this.supermarketRespository.findOne({
      where: { id },
      relations: ['cities'],
    });

    await this.supermarketValidation.validateExistingSupermarket(supermarket);

    return await this.supermarketRespository.remove(supermarket);
  }
}

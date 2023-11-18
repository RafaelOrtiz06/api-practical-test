import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCityDto } from '../../dto/create-city.dto';
import { UpdateCityDto } from '../../dto/update-city.dto';
import { City } from '../../entities/city.entity';
import { Repository } from 'typeorm';
import { CitiesValidationService } from '../cities-validation/cities-validation.service';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,

    private readonly citiesValidation: CitiesValidationService,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    await this.citiesValidation.validateCountryName(createCityDto.country);

    return await this.cityRepository.save(createCityDto);
  }

  async findAll(): Promise<City[]> {
    return await this.cityRepository.find({ relations: ['supermarkets'] });
  }

  async findOne(id: string): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { id },
      relations: ['supermarkets'],
    });

    await this.citiesValidation.validateExistingCity(city);

    return await this.cityRepository.findOne({
      where: { id },
      relations: ['supermarkets'],
    });
  }

  async update(id: string, updateCityDto: UpdateCityDto): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { id },
      relations: ['supermarkets'],
    });

    await this.citiesValidation.validateExistingCity(city);

    return await this.cityRepository.save({
      ...city,
      ...updateCityDto,
    });
  }

  async delete(id: string): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { id },
    });

    await this.citiesValidation.validateExistingCity(city);

    return this.cityRepository.remove(city);
  }
}

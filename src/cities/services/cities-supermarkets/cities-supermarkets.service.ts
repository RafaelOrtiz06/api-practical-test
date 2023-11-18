import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from '../../entities/city.entity';
import { Supermarket } from '../../../supermarkets/entities/supermarket.entity';
import { Repository } from 'typeorm';
import { CitiesValidationService } from '../cities-validation/cities-validation.service';
import { SupermarketsValidationService } from '../../../supermarkets/services/supermarkets-validation/supermarkets-validation.service';

@Injectable()
export class CitiesSupermarketsService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,

    @InjectRepository(Supermarket)
    private readonly supermarketRepository: Repository<Supermarket>,

    private readonly citiesValidation: CitiesValidationService,
    private readonly supermarketValidation: SupermarketsValidationService,
  ) {}

  async addSupermarketToCity(cityId: string, supermarketId: string) {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });

    await this.citiesValidation.validateExistingCity(city);

    const supermarket = await this.supermarketRepository.findOne({
      where: { id: supermarketId },
      relations: ['cities'],
    });

    await this.supermarketValidation.validateExistingSupermarket(supermarket);

    city.supermarkets = [...city.supermarkets, supermarket];

    return await this.cityRepository.save(city);
  }

  async findSupermarketsFromCity(cityId: string) {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });

    await this.citiesValidation.validateExistingCity(city);

    return city.supermarkets;
  }

  async findSupermarketFromCity(
    cityId: string,
    supermarketId: string,
  ): Promise<Supermarket> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });

    await this.citiesValidation.validateExistingCity(city);

    const supermarket = await this.supermarketRepository.findOne({
      where: { id: supermarketId },
      relations: ['cities'],
    });

    await this.supermarketValidation.validateExistingSupermarket(supermarket);

    const associatedSupermarket = city.supermarkets.find(
      (supermarket) => supermarket.id === supermarketId,
    );

    await this.supermarketValidation.validateAssociatedSupermarket(
      associatedSupermarket,
    );

    return associatedSupermarket;
  }

  async updateSupermarketsFromCity(
    cityId: string,
    supermarkets: Supermarket[],
  ): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });

    await this.citiesValidation.validateExistingCity(city);

    for (let i = 0; i < supermarkets.length; i++) {
      const supermarket: Supermarket = await this.supermarketRepository.findOne(
        {
          where: { id: supermarkets[i].id },
        },
      );

      await this.supermarketValidation.validateExistingSupermarket(supermarket);
      await this.supermarketValidation.validateAssociatedSupermarket(
        supermarket,
      );
    }
    city.supermarkets = supermarkets;

    return await this.cityRepository.save(city);
  }

  async deleteSupermarketFromCity(
    cityId: string,
    supermarketId: string,
  ): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });

    await this.citiesValidation.validateExistingCity(city);

    const supermarket = await this.supermarketRepository.findOne({
      where: { id: supermarketId },
      relations: ['cities'],
    });

    await this.supermarketValidation.validateExistingSupermarket(supermarket);

    const associatedSupermarket = city.supermarkets.find(
      (supermarket) => supermarket.id === supermarketId,
    );

    await this.supermarketValidation.validateAssociatedSupermarket(
      associatedSupermarket,
    );

    city.supermarkets = city.supermarkets.filter(
      (supermarket) => supermarket.id !== supermarketId,
    );

    return await this.cityRepository.save(city);
  }
}

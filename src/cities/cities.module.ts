import { Module } from '@nestjs/common';

import { CitiesController } from './controllers/cities/cities.controller';
import { CitiesService } from './services/cities/cities.service';
import { CitiesValidationService } from './services/cities-validation/cities-validation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { CitiesSupermarketsService } from './services/cities-supermarkets/cities-supermarkets.service';
import { CitiesSupermarketsController } from './controllers/cities-supermarkets/cities-supermarkets.controller';
import { Supermarket } from '../supermarkets/entities/supermarket.entity';
import { SupermarketsValidationService } from '../supermarkets/services/supermarkets-validation/supermarkets-validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([City, Supermarket])],
  controllers: [CitiesController, CitiesSupermarketsController],
  providers: [
    CitiesService,
    CitiesValidationService,
    CitiesSupermarketsService,
    SupermarketsValidationService,
  ],
})
export class CitiesModule {}

import { Module } from '@nestjs/common';

import { CitiesController } from './controllers/cities/cities.controller';
import { CitiesService } from './services/cities/cities.service';
import { CitiesValidationService } from './services/cities-validation/cities-validation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { CitiesSupermarketsService } from './services/cities-supermarkets/cities-supermarkets.service';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CitiesController],
  providers: [
    CitiesService,
    CitiesValidationService,
    CitiesSupermarketsService,
  ],
})
export class CitiesModule {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { IsString, IsIn, IsNumber } from 'class-validator';
import { allowedCountries } from '../utils/allowed-cities';

export class UpdateCityDto extends PartialType(CreateCityDto) {
  @IsString()
  name?: string;

  @IsString()
  @IsIn(allowedCountries)
  country?: string;

  @IsNumber()
  population?: number;
}

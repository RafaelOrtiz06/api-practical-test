import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { allowedCountries } from '../utils/allowed-cities';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(allowedCountries)
  country: string;

  @IsNumber()
  @IsNotEmpty()
  population: number;
}

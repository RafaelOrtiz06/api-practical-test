import { PartialType } from '@nestjs/mapped-types';
import { CreateSupermarketDto } from './create-supermarket.dto';
import { IsString, Length, IsNumber } from 'class-validator';

export class UpdateSupermarketDto extends PartialType(CreateSupermarketDto) {
  @IsString()
  @Length(10, 255)
  name?: string;

  @IsNumber()
  longitude?: number;

  @IsNumber()
  latitude?: number;

  @IsString()
  webPage?: string;
}

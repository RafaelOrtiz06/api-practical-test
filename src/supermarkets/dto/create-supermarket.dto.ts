import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateSupermarketDto {
  @IsString()
  @Length(10, 255)
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsString()
  @IsNotEmpty()
  webPage: string;
}

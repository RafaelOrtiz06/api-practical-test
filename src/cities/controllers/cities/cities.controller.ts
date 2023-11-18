import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Put,
} from '@nestjs/common';

import { CitiesService } from '../../services/cities/cities.service';
import { CreateCityDto } from '../../dto/create-city.dto';
import { UpdateCityDto } from '../../dto/update-city.dto';
import { BusinessErrorsInterceptor } from '../../../shared/interceptors/interceptors';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.citiesService.delete(id);
  }
}

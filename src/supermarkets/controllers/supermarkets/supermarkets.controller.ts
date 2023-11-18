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

import { SupermarketsService } from '../../services/supermarkets/supermarkets.service';
import { CreateSupermarketDto } from '../../dto/create-supermarket.dto';
import { UpdateSupermarketDto } from '../../dto/update-supermarket.dto';
import { BusinessErrorsInterceptor } from '../../../shared/interceptors/interceptors';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('supermarkets')
export class SupermarketsController {
  constructor(private readonly supermarketsService: SupermarketsService) {}

  @Post()
  create(@Body() createSupermarketDto: CreateSupermarketDto) {
    return this.supermarketsService.create(createSupermarketDto);
  }

  @Get()
  findAll() {
    return this.supermarketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supermarketsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupermarketDto: UpdateSupermarketDto,
  ) {
    return this.supermarketsService.update(id, updateSupermarketDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.supermarketsService.delete(id);
  }
}

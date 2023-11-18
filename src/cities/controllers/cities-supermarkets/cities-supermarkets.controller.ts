import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CitiesSupermarketsService } from '../../services/cities-supermarkets/cities-supermarkets.service';
import { Supermarket } from '../../../supermarkets/entities/supermarket.entity';
import { BusinessErrorsInterceptor } from '../../../shared/interceptors/interceptors';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('cities')
export class CitiesSupermarketsController {
  constructor(
    private readonly citiesSupermarketsService: CitiesSupermarketsService,
  ) {}

  @Post(':cityId/supermarkets/:supermarketId')
  addSupermarketToCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ) {
    return this.citiesSupermarketsService.addSupermarketToCity(
      cityId,
      supermarketId,
    );
  }

  @Get(':cityId/supermarkets')
  findSupermarketsFromCity(@Param('cityId') cityId: string) {
    return this.citiesSupermarketsService.findSupermarketsFromCity(cityId);
  }

  @Get(':cityId/supermarkets/:supermarketId')
  findSupermarketFromCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ) {
    return this.citiesSupermarketsService.findSupermarketFromCity(
      cityId,
      supermarketId,
    );
  }

  @Put(':cityId/supermarkets')
  updateSupermarketsFromCity(
    @Param('cityId') cityId: string,
    @Body() supermarkets: Supermarket[],
  ) {
    return this.citiesSupermarketsService.updateSupermarketsFromCity(
      cityId,
      supermarkets,
    );
  }

  @Delete(':cityId/supermarkets/:supermarketId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSupermarketFromCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ) {
    return this.citiesSupermarketsService.deleteSupermarketFromCity(
      cityId,
      supermarketId,
    );
  }
}

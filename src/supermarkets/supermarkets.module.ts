import { Module } from '@nestjs/common';

import { SupermarketsValidationService } from './services/supermarkets-validation/supermarkets-validation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supermarket } from './entities/supermarket.entity';
import { SupermarketsService } from './services/supermarkets/supermarkets.service';
import { SupermarketsController } from './controllers/supermarkets/supermarkets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Supermarket])],
  controllers: [SupermarketsController],
  providers: [SupermarketsService, SupermarketsValidationService],
})
export class SupermarketsModule {}

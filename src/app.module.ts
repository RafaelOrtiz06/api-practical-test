import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';
import { SupermarketsModule } from './supermarkets/supermarkets.module';

@Module({
  imports: [CitiesModule, SupermarketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { SupermarketsModule } from './supermarkets/supermarkets.module';

@Module({
  imports: [CitiesModule, SupermarketsModule],
  providers: [],
})
export class AppModule {}

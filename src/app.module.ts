import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { SupermarketsModule } from './supermarkets/supermarkets.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    CitiesModule,
    SupermarketsModule,
  ],
  providers: [],
})
export class AppModule {}

import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '../../cities/entities/city.entity';
import { Supermarket } from '../../supermarkets/entities/supermarket.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [City, Supermarket],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([City, Supermarket]),
];

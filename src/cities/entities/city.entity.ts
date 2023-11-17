import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  population: number;

  @ManyToMany(() => Supermarket, (supermarket) => supermarket.cities)
  @JoinTable({
    name: 'city_supermarkets',
    joinColumn: {
      name: 'city_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'supermarket_id',
      referencedColumnName: 'id',
    },
  })
  supermarkets: Supermarket[];
}

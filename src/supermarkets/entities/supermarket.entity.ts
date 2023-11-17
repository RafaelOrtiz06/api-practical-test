import { City } from 'src/cities/entities/city.entity';
import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Supermarket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  webPage: string;

  @ManyToMany(() => City, (city) => city.supermarkets)
  cities: City[];
}

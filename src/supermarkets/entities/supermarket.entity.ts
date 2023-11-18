import { City } from '../../cities/entities/city.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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

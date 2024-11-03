import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city';
import { Region } from './region';

@Entity()
export class SubRegion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @ManyToOne(
    () => Region,
    (region: Region) => region.subRegions,
  )
  region!: Region;

  @OneToMany(
    () => City,
    (city: City) => city.subRegion,
  )
  cities!: City[];
}

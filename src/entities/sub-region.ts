import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { City } from './city';
import { Region } from './region';

@Entity()
export class SubRegion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(
    () => Region,
    (region: Region) => region.subRegions,
  )
  @JoinColumn({ name: 'regionId' })
  region!: Region;

  @Column()
  regionId!: number;

  @OneToMany(
    () => City,
    (city: City) => city.subRegion,
  )
  cities!: City[];
}

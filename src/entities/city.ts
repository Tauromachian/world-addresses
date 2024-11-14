import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SubRegion } from './sub-region';
import { ZipCode } from './zipcode';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(
    () => SubRegion,
    (subRegion: SubRegion) => subRegion.cities,
  )
  @JoinColumn({ name: 'subRegionId' })
  subRegion!: SubRegion;

  @Column()
  subRegionId!: number;

  @OneToMany(
    () => ZipCode,
    (zipCode: ZipCode) => zipCode.city,
  )
  zipCodes!: ZipCode[];
}

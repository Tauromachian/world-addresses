import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SubRegion } from './sub-region';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  zipcode!: string;

  @Column()
  city!: string;

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
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { City } from './city';

@Entity()
export class ZipCode {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @ManyToOne(
    () => City,
    (city: City) => city.zipCodes,
  )
  @JoinColumn({ name: 'cityId' })
  city!: City;

  @Column()
  cityId!: number;
}

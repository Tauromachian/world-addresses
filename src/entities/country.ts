import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Region } from './region';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string;

  @OneToMany(
    () => Region,
    (region: Region) => region.country,
  )
  regions!: Region[];
}

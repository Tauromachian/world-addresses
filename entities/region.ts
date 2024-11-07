import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubRegion } from './sub-region';
import { Country } from './country';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  code!: string;

  @OneToMany(
    () => SubRegion,
    (subRegion: SubRegion) => subRegion.region,
  )
  subRegions!: SubRegion[];

  @ManyToOne(
    () => Country,
    (country: Country) => country.regions,
  )
  country!: Country;
}

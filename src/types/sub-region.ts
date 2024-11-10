import { City } from './city';

export type SubRegion = {
  id?: number;
  name: string;
  regionId: number;
  cities?: City[];
};

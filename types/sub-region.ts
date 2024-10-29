import { City } from './city';

export type SubRegion = {
  id?: number;
  name: string;
  cities?: City[];
};

import { SubRegion } from './sub-region';

export type Region = {
  id?: number;
  name: string;
  code: string;
  country: string;
  subRegions?: SubRegion[];
};

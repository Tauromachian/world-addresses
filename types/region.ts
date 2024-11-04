import { SubRegion } from './sub-region';

export type Region = {
  id?: number;
  name: string;
  code: string;
  countryId: number;
  subRegions?: SubRegion[];
};

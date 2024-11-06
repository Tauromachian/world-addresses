import { Region } from './region';

export type Country = {
  id?: number;
  code: string;
  regions?: Region[];
};

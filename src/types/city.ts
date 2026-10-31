import { CityName } from '../const';
import type { LocationType } from './location';

export type CityType = {
  location: LocationType;
  name: CityName;
};

import { CityName } from '../const';
import { LocationType } from './location';

export type CityType = {
  location: LocationType;
  name: CityName;
};

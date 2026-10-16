import { CityType } from './city';
import { LocationType } from './location';

export type OfferPreviewType = {
  city: CityType;
  goods: string[];
  id: string;
  isFavorite: boolean;
  isPremium: boolean;
  location: LocationType;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

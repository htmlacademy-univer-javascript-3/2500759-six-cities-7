import { OfferPreviewType } from './offer-preview';
import { UserType } from './user';

export type OfferType = OfferPreviewType & {
  bedrooms: number;
  description: string;
  host: UserType;
  images: string[];
  maxAdults: number;
};

import { SortType } from './const';
import type { OfferType } from './types/offer';

export const sortOffers = (offers: OfferType[], sort: SortType): OfferType[] => {
  switch (sort) {
    case SortType.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return [...offers].sort((a, b) => b.rating - a.rating);
    case SortType.Popular:
    default:
      return offers;
  }
};

import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../const';
import { OfferType } from '../types/offer';

export const changeCity = createAction<CityName>('city/change');
export const loadOffers = createAction<OfferType[]>('offers/load');

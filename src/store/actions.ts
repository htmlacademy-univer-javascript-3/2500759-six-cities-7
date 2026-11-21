import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../const';
import { OfferType } from '../types/offer';

export const changeCity = createAction<CityName>('city/change');

export const loadOffersRequest = createAction('offers/load-request');
export const loadOffersSuccess = createAction<OfferType[]>('offers/load-success');
export const loadOffersError = createAction<string>('offers/load-error');

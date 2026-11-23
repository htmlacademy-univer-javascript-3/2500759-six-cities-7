import { createAction } from '@reduxjs/toolkit';
import { CityName, AuthorizationStatus } from '../const';
import type { OfferType } from '../types/offer';
import type { AuthInfo } from '../types/user';

export const changeCity = createAction<CityName>('city/change');

export const loadOffersRequest = createAction('offers/load-request');
export const loadOffersSuccess = createAction<OfferType[]>('offers/load-success');
export const loadOffersError = createAction<string>('offers/load-error');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/set-authorization-status');
export const setUser = createAction<AuthInfo | null>('user/set-user');

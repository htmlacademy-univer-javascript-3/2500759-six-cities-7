import { createAction } from '@reduxjs/toolkit';
import { CityName, AuthorizationStatus } from '../const';
import type { OfferType } from '../types/offer';
import type { ReviewType } from '../types/review';
import type { AuthInfo } from '../types/user';
import type { OfferPreviewType } from '../types/offer-preview';

export const changeCity = createAction<CityName>('city/change');

export const loadOffersRequest = createAction('offers/load-request');
export const loadOffersSuccess = createAction<OfferType[]>('offers/load-success');
export const loadOffersError = createAction<string>('offers/load-error');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/set-authorization-status');
export const setUser = createAction<AuthInfo | null>('user/set-user');
export const setOffer = createAction<OfferType | null>('offers/set-offers');
export const setNearPlaces = createAction<OfferPreviewType[]>('offers/set-near-places');
export const setReviews = createAction<ReviewType[]>('offers/set-reviews');
export const addReview = createAction<ReviewType>('offers/add-review');
export const setOfferLoading = createAction<boolean>('offers/set-is-offer-loading');

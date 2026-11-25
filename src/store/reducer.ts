import { createReducer } from '@reduxjs/toolkit';
import { CityName, AuthorizationStatus } from '../const';
import type { OfferType } from '../types/offer';
import type { ReviewType } from '../types/review';
import type { OfferPreviewType } from '../types/offer-preview';
import { changeCity, loadOffersError, loadOffersRequest, loadOffersSuccess, setAuthorizationStatus, setReviews, setNearPlaces, setOffer, setOfferLoading, setUser, addReview } from './actions';
import { AuthInfo } from '../types/user';

type InitialStateType = {
  city: CityName;
  offers: OfferType[];
  isLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
  offer: OfferType | null;
  nearPlaces: OfferPreviewType[];
  reviews: ReviewType[];
  isOfferLoading: boolean;
};

const initialState: InitialStateType = {
  city: CityName.Paris,
  offers: [],
  isLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  offer: null,
  nearPlaces: [],
  reviews: [],
  isOfferLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffersRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(loadOffersSuccess, (state, action) => {
      state.offers = action.payload;
      state.isLoading = false;
    })
    .addCase(loadOffersError, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setNearPlaces, (state, action) => {
      state.nearPlaces = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(addReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(setOfferLoading, (state, action) => {
      state.isOfferLoading = action.payload;
    });
});

export default reducer;

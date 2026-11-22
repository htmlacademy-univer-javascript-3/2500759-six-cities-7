import { createReducer } from '@reduxjs/toolkit';
import { CityName, AuthorizationStatus } from '../const';
import type { OfferType } from '../types/offer';
import { changeCity, loadOffersError, loadOffersRequest, loadOffersSuccess, setAuthorizationStatus, setUser } from './actions';
import { AuthInfo } from '../types/user';

type InitialStateType = {
  city: CityName;
  offers: OfferType[];
  isLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
};

const initialState: InitialStateType = {
  city: CityName.Paris,
  offers: [],
  isLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
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
    });
});

export default reducer;

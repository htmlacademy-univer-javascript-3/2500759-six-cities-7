import { createReducer } from '@reduxjs/toolkit';
import { CityName } from '../const';
import type { OfferType } from '../types/offer';
import { changeCity, loadOffersError, loadOffersRequest, loadOffersSuccess } from './actions';

type InitialStateType = {
  city: CityName;
  offers: OfferType[];
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialStateType = {
  city: CityName.Paris,
  offers: [],
  isLoading: false,
  error: null,
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
    });
});

export default reducer;

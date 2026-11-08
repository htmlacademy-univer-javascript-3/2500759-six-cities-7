import { createReducer } from '@reduxjs/toolkit';
import { CityName } from '../const';
import type { OfferType } from '../types/offer';
import { changeCity, loadOffers } from './actions';

type InitialStateType = {
  city: CityName;
  offers: OfferType[];
};

const initialState: InitialStateType = {
  city: CityName.Paris,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export default reducer;

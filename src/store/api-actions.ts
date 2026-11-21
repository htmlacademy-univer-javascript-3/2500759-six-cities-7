import type { AppThunk } from './index';
import { loadOffersRequest, loadOffersSuccess, loadOffersError } from './actions';
import type { OfferType } from '../types/offer';

export const loadOffers = (): AppThunk => async (dispatch, _getState, api) => {
  dispatch(loadOffersRequest());
  try {
    const {data} = await api.get<OfferType[]>('/offers');
    dispatch(loadOffersSuccess(data));
  } catch (error) {
    dispatch(loadOffersError(error instanceof Error ? error.message : 'Неизвестная ошибка'));
  }
};

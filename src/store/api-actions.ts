import type { AppThunk } from './index';
import { loadOffersRequest, loadOffersSuccess, loadOffersError, setAuthorizationStatus, setUser } from './actions';
import type { OfferType } from '../types/offer';
import { AuthorizationStatus } from '../const';
import type { AuthInfo } from '../types/user';

export const loadOffers = (): AppThunk => async (dispatch, _getState, api) => {
  dispatch(loadOffersRequest());
  try {
    const {data} = await api.get<OfferType[]>('/offers');
    dispatch(loadOffersSuccess(data));
  } catch (error) {
    dispatch(loadOffersError(error instanceof Error ? error.message : 'Неизвестная ошибка'));
  }
};

export const checkAuth = (): AppThunk => async (dispatch, _getState, api) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    return;
  }
  try {
    const {data} = await api.get<AuthInfo>('/login');
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
};

export const login = (credentials: {email: string; password: string}): AppThunk<Promise<boolean>> =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<AuthInfo>('/login', credentials);
      localStorage.setItem('token', data.token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
      return true;
    } catch {
      return false;
    }
  };

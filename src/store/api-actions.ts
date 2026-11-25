import type { AppThunk } from './index';
import { loadOffersRequest, loadOffersSuccess, loadOffersError, setAuthorizationStatus, setUser, setOffer, setOfferLoading, setNearPlaces, setReviews, addReview } from './actions';
import type { OfferType } from '../types/offer';
import { AuthorizationStatus } from '../const';
import type { AuthInfo } from '../types/user';
import type { OfferPreviewType } from '../types/offer-preview';
import type { ReviewType } from '../types/review';

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

export const fetchOffer = (id:string): AppThunk => async (dispatch, _getState, api) => {
  dispatch(setOfferLoading(true));
  try {
    const {data} = await api.get<OfferType>(`/offers/${id}`);
    dispatch(setOffer(data));
  } catch{
    dispatch(setOffer(null));
  } finally {
    dispatch(setOfferLoading(false));
  }
};

export const fetchNearPlaces = (id:string): AppThunk => async (dispatch, _getState, api) => {
  try {
    const {data} = await api.get<OfferPreviewType[]>(`/offers/${id}/nearby`);
    dispatch(setNearPlaces(data));
  } catch {
    dispatch(setNearPlaces([]));
  }
};

export const fetchReviews = (id:string): AppThunk => async (dispatch, _getState, api) => {
  try {
    const {data} = await api.get<ReviewType[]>(`/comments/${id}`);
    dispatch(setReviews(data));
  } catch {
    dispatch(setReviews([]));
  }
};

export const postReview = (data: {offerId: string; comment: string; rating: number}): AppThunk<Promise<boolean>> => async (dispatch, _getState, api) => {
  try {
    const {data: newComment} = await api.post<ReviewType>(`/comments/${data.offerId}`, {comment: data.comment, rating: data.rating});
    dispatch(addReview(newComment));
    return true;
  } catch {
    return false;
  }
};

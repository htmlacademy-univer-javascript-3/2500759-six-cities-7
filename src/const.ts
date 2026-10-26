//import { CityType } from './types/city';

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 100;

export const Settings = {
  CardsCount: 5
};

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*'
}

export const getOfferRoute = (id: string): string => AppRoute.Offer.replace(':id', id);

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum CityName {
  Paris = 'Paris',
  Brussels = 'Brussels',
  Cologne = 'Cologne',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

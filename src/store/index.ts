import { configureStore } from '@reduxjs/toolkit';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { AnyAction } from 'redux';
import type { AxiosInstance } from 'axios';
import reducer from './reducer';
import { api } from '../api';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: api },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  AxiosInstance,
  AnyAction
>;

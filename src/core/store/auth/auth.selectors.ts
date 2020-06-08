import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthStateInterface} from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthStateInterface>('auth');

export const selectAuthToken = createSelector(selectAuthState, (state: AuthStateInterface) => state.token);

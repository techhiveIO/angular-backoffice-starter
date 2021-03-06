import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthStateInterface} from '../../../shared/models/authState.model';

export const selectAuthState = createFeatureSelector<AuthStateInterface>('auth');

export const selectIsAuthenticated = createSelector(selectAuthState, (state: AuthStateInterface) => state.token !== '');
export const selectAttemptedEmail = createSelector(selectAuthState, (state: AuthStateInterface) => state.attemptedEmail);

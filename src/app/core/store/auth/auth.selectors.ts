import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthStateInterface} from '../../models/authState.model';

export const selectAuthState = createFeatureSelector<AuthStateInterface>('auth');

export const selectIsAuthenticated = createSelector(selectAuthState, (state: AuthStateInterface) => state.token !== '');

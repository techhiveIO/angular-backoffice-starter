import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserStateInterface} from './users.reducer';

export const selectUsersState = createFeatureSelector<UserStateInterface>('users');

export const selectAllUsers = createSelector(selectUsersState, (state: UserStateInterface) => state.users);

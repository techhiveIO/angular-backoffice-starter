import {authReducer, AuthStateInterface} from './auth/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

export const reducers: ActionReducerMap<CoreState> = {
  auth: authReducer,
};

export interface CoreState {
  auth: AuthStateInterface;
}

import {authReducer} from './auth/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {AuthStateInterface} from '../models/authState.model';

export const reducers: ActionReducerMap<CoreState> = {
  auth: authReducer,
};

export interface CoreState {
  auth: AuthStateInterface;
}

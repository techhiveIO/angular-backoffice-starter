import {ActionReducerMap} from '@ngrx/store';
import {authReducer} from './auth/store/auth.reducer';
import {AuthStateInterface} from './models/authState.model';

export const reducers: ActionReducerMap<CoreState> = {
  auth: authReducer,
};

export interface CoreState {
  auth: AuthStateInterface;
}

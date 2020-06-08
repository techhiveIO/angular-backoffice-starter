import {User} from '../../models/user.model';
import {createReducer, on} from '@ngrx/store';
import {login} from './auth.actions';

export interface AuthStateInterface {
  token: string;
  user: User;
}

const initialState: AuthStateInterface = {
  token: '',
  user: null,
};

const reducer = createReducer(
  initialState,
  on(login),
);

export function authReducer(state, action) {
  return reducer(state, action);
}

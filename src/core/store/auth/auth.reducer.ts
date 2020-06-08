import {createReducer, on} from '@ngrx/store';
import {login} from './auth.actions';
import {AuthStateInterface} from '../../models/authState.model';

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

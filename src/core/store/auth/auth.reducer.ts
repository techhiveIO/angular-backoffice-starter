import {createReducer, on} from '@ngrx/store';
import {actionLogin} from './auth.actions';
import {AuthStateInterface} from '../../models/authState.model';

const initialState: AuthStateInterface = {
  token: '',
  user: null,
};

const reducer = createReducer(
  initialState,
  on(actionLogin),
);

export function authReducer(state, action) {
  return reducer(state, action);
}

import {Action, createReducer, on} from '@ngrx/store';
import {actionLogin, actionLogout} from './authActionTypes';
import {AuthStateInterface} from '../../models/authState.model';

export const initialState: AuthStateInterface = {
  token: '',
  user: null,
};

const reducer = createReducer(
  initialState,
  on(actionLogin, (state, action) => ({...state, ...action.payload})),
  on(actionLogout, (state) => (initialState))
);

export function authReducer(state: AuthStateInterface | undefined, action: Action) {
  return reducer(state, action);
}

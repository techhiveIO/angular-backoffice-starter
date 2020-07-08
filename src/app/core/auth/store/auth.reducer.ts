import {Action, createReducer, on} from '@ngrx/store';
import {actionClearEmailAttempt, actionLogin, actionLogout, actionStoreConfirmationToken, actionStoreEmailAttempt} from './authActionTypes';
import {AuthStateInterface} from '../../../shared/models/authState.model';

export const initialState: AuthStateInterface = {
  token: '',
  user: null,
  confirmationToken: null,
  attemptedEmail: null,
};

const reducer = createReducer(
  initialState,
  on(
    actionLogin,
    actionStoreConfirmationToken,
    actionStoreEmailAttempt,
    (state, action: { payload: Partial<AuthStateInterface> }) => ({...state, ...action.payload}),
  ),
  on(actionLogout, (state) => (initialState)),
  on(actionClearEmailAttempt, (state => ({...state, attemptedEmail: null}))),
);

export function authReducer(state: AuthStateInterface | undefined, action: Action) {
  return reducer(state, action);
}

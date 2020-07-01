import {createAction, props} from '@ngrx/store';
import {AuthStateInterface, ConfirmationTokenInterface} from '../../../shared/models/authState.model';

export enum AuthActionTypes {
  LOGIN = '[Auth] LOGIN',
  LOGOUT = '[Auth] LOGOUT',
  STORE_EMAIL_TOKEN = '[Auth] STORE EMAIL TOKEN',
}

export const actionLogin = createAction(AuthActionTypes.LOGIN,
  props<{
    payload: AuthStateInterface
  }>()
);

export const actionLogout = createAction(AuthActionTypes.LOGOUT, props<{}>());

export const actionStoreConfirmationToken = createAction(AuthActionTypes.STORE_EMAIL_TOKEN,
  props<{
    payload: { confirmationToken: ConfirmationTokenInterface },
  }>()
);

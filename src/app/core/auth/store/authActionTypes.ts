import {createAction, props} from '@ngrx/store';
import {AuthStateInterface, ConfirmationTokenInterface} from '../../../shared/models/authState.model';

export enum AuthActionTypes {
  LOGIN = '[Auth] LOGIN',
  LOGOUT = '[Auth] LOGOUT',
  STORE_EMAIL_TOKEN = '[Auth] STORE EMAIL TOKEN',
  STORE_EMAIL_ATTEMPT = '[Auth] STORE EMAIL ATTEMPT',
  CLEAR_EMAIL_ATTEMPT = '[Auth] CLEAR EMAIL ATTEMPT',
}

export const actionLogin = createAction(AuthActionTypes.LOGIN,
  props<{
    payload: Partial<AuthStateInterface>
  }>()
);

export const actionLogout = createAction(AuthActionTypes.LOGOUT, props<{}>());

export const actionStoreConfirmationToken = createAction(AuthActionTypes.STORE_EMAIL_TOKEN,
  props<{
    payload: { confirmationToken: ConfirmationTokenInterface },
  }>()
);

export const actionStoreEmailAttempt = createAction(AuthActionTypes.STORE_EMAIL_ATTEMPT,
  props<{
    payload: { attemptedEmail: string },
  }>()
);

export const actionClearEmailAttempt = createAction(AuthActionTypes.CLEAR_EMAIL_ATTEMPT, props<{}>());

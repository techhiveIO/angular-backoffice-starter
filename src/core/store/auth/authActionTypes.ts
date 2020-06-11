import {createAction, props} from '@ngrx/store';
import {AuthStateInterface} from '../../models/authState.model';

export enum AuthActionTypes {
  LOGIN = '[Auth] LOGIN',
  LOGOUT = '[Auth] LOGOUT'
}

export const actionLogin = createAction(AuthActionTypes.LOGIN,
  props<{
    payload: AuthStateInterface
  }>()
);

export const actionLogout = createAction(AuthActionTypes.LOGOUT);

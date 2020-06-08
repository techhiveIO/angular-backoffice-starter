import {createAction, props} from '@ngrx/store';
import {AuthStateInterface} from '../../models/authState.model';

export const actionLogin = createAction('[Auth] LOGIN',
  props<{
    authState: AuthStateInterface
  }>()
);

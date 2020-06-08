import {createAction, props} from '@ngrx/store';

export const login = createAction('[Auth] LOGIN',
  props<{
    email: string,
    password: string,
  }>()
);

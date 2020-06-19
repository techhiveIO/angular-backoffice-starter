import {createAction, props} from '@ngrx/store';
import {User} from '../../../shared/models/user.model';

export enum UserActionTypes {
  STORE_USERS = '[Users] STORE_USERS',
}

export const actionStoreUsers = createAction(UserActionTypes.STORE_USERS,
  props<{ payload: { users: User[] } }>()
);

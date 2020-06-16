import {User} from '../../../core/models/user.model';
import {Action, createReducer, on} from '@ngrx/store';
import {actionStoreUsers} from './users.actions';

export interface UserStateInterface {
  users: User[],
}

export const initialState: UserStateInterface = {
  users: [],
};

const reducer = createReducer(
  initialState,
  on(actionStoreUsers, (state: UserStateInterface, action) => ({...state, ...action}))
);

export function usersReducer(state: UserStateInterface | undefined, action: Action) {
  return reducer(state, action);
}

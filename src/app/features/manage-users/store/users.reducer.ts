import {Action, createReducer, on} from '@ngrx/store';
import {actionStoreUsers} from './users.actions';
import {User} from '../../../shared/models/user.model';

export interface UserStateInterface {
  users: User[],
}

export const initialState: UserStateInterface = {
  users: [],
};

const reducer = createReducer(
  initialState,
  on(actionStoreUsers, (state: UserStateInterface, action) => ({...state, ...action.payload}))
);

export function usersReducer(state: UserStateInterface | undefined, action: Action) {
  return reducer(state, action);
}

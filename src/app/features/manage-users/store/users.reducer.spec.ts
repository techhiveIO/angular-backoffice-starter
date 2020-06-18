import {Action} from '@ngrx/store';
import {initialState, usersReducer} from './users.reducer';
import {actionStoreUsers} from './users.actions';
import {User} from '../../../core/models/user.model';
import {MOCKED_API_USER} from '../../../core/mocks/users.mocks';

describe('UsersReducer', () => {
  const mockedEmptyAction: Action = {type: ''};

  describe('on init', () => {
    it('should load the default empty state', () => {
      const loadedState = usersReducer(undefined, mockedEmptyAction);
      expect(loadedState).toBe(initialState);
    });
  });

  describe('on store users', () => {
    it('should store the provided users array', () => {
      const userArray: User[] = [new User(MOCKED_API_USER)];
      const loadedState = usersReducer(undefined, actionStoreUsers({payload: {users: userArray}}));

      expect(loadedState).toEqual({
        users: userArray,
      });
    });
  });
});

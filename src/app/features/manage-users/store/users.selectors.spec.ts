import {User} from '../../../core/models/user.model';
import {MOCKED_API_USER} from '../../../core/mocks/users.mocks';
import {selectAllUsers} from './users.selector';
import {initialState} from './users.reducer';

describe('UsersSelectors', () => {
  describe('selectAllUsers', () => {
    it('should return an array of users', () => {
      const usersArray = [new User(MOCKED_API_USER)];
      const state = {
        ...initialState,
        users: usersArray,
      };

      expect(selectAllUsers.projector(state)).toEqual(usersArray);
    });
  });
});

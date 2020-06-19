import {selectAllUsers} from './users.selector';
import {initialState} from './users.reducer';
import {User} from '../../../shared/models/user.model';
import {MOCKED_API_USER} from '../../../shared/mocks/users.mocks';

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

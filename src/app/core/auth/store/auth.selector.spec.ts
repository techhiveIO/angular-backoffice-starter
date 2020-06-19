import {selectIsAuthenticated} from './auth.selectors';
import {initialState} from './auth.reducer';
import {MOCKED_AUTH_STATE} from '../../../shared/mocks/auth.mocks';

describe('AuthSelectors', () => {
  describe('selectIsAuthenticated', () => {
    it('should return true if a token exists', () => {
      expect(selectIsAuthenticated.projector(MOCKED_AUTH_STATE)).toBe(true);
    });

    it('should return false if a token does not exist', () => {
      expect(selectIsAuthenticated.projector(initialState)).toBe(false);
    });
  });
});

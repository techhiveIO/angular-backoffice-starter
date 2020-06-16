import {selectIsAuthenticated} from './auth.selectors';
import {MOCKED_AUTH_STATE} from '../../mocks/auth.mocks';
import {initialState} from './auth.reducer';

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

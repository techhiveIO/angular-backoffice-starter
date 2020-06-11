import {Action} from '@ngrx/store';
import {authReducer, initialState} from './auth.reducer';
import {actionLogin, actionLogout} from './authActionTypes';
import {MOCKED_AUTH_STATE} from '../../mocks/auth.mocks';

describe('Auth Reducer', () => {
  const mockedEmptyAction: Action = {type: ''};

  describe('on load', () => {
    it('should load the default empty state', () => {
      const loadedState = authReducer(undefined, mockedEmptyAction);
      expect(loadedState).toEqual(initialState);
    });
  });

  describe('on login', () => {
    it('should store the token and user information', () => {
      const loadedState = authReducer(undefined, actionLogin({payload: MOCKED_AUTH_STATE}));

      expect(loadedState).toEqual(MOCKED_AUTH_STATE);
    });
  });

  describe('on logout', () => {
    it('should clear the user data and token', () => {
      const loadedState = authReducer(undefined, actionLogout);

      expect(loadedState).toEqual(initialState);
    });
  });
});

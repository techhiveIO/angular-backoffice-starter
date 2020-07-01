import {Action} from '@ngrx/store';
import {authReducer, initialState} from './auth.reducer';
import {actionLogin, actionLogout, actionStoreConfirmationToken} from './authActionTypes';
import {MOCKED_AUTH_STATE, MOCKED_AUTH_STATE_WITH_CONFIRMATION, MOCKED_CONFIRMATION_EMAIL_TOKEN} from '../../../shared/mocks/auth.mocks';

describe('Auth Reducer', () => {
  const mockedEmptyAction: Action = {type: ''};

  describe('on init', () => {
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

  describe('on store email token', () => {
    it('should store the email confirmation token', () => {
      const loadedState = authReducer(
        undefined,
        actionStoreConfirmationToken({payload: {confirmationToken: MOCKED_CONFIRMATION_EMAIL_TOKEN}}),
      );

      expect(loadedState).toEqual(MOCKED_AUTH_STATE_WITH_CONFIRMATION);
    });
  });

  describe('on logout', () => {
    it('should clear the user data and token', () => {
      const loadedState = authReducer(undefined, actionLogout);

      expect(loadedState).toEqual(initialState);
    });
  });
});

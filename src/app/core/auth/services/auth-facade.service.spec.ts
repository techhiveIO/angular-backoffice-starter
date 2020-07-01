import {AuthFacade} from './auth-facade.service';
import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of, throwError} from 'rxjs';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {MemoizedSelector} from '@ngrx/store';
import {selectIsAuthenticated} from '../store/auth.selectors';
import {actionLogin, actionLogout} from '../store/authActionTypes';
import {AuthApi} from './auth-api.service';
import {AuthStateInterface} from '../../../shared/models/authState.model';
import {User} from '../../../shared/models/user.model';
import {MOCKED_AUTH_STATE, MOCKED_CONFIRMATION_EMAIL_TOKEN} from '../../../shared/mocks/auth.mocks';
import {NotificationsFacade} from '../../services';
import {MOCKED_API_USER} from '../../../shared/mocks/users.mocks';
import {take} from 'rxjs/operators';

describe('Auth Facade Service', () => {
  const mockedInitialAuthState: AuthStateInterface = {
    token: '',
    user: null,
  };

  let service: AuthFacade;
  let mockedAuthApi: jasmine.SpyObj<AuthApi>;
  let store: MockStore;
  let mockedIsAuthenticatedSelector: MemoizedSelector<AuthStateInterface, boolean>;
  let mockedNotificationsFacade: jasmine.SpyObj<NotificationsFacade>;

  const configureTestingModule: (userIsAuthenticated: boolean) => void = (userIsAuthenticated) => {
    mockedAuthApi = jasmine.createSpyObj('AuthApi', ['login', 'fetchVerificationTokenInfo', 'register']);
    mockedAuthApi.login.and.returnValue(of(MOCKED_AUTH_STATE));
    mockedNotificationsFacade = jasmine.createSpyObj(NotificationsFacade, ['displayErrorMessage']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthFacade,
        provideMockStore({initialState: mockedInitialAuthState}),
        {
          provide: AuthApi, useValue: mockedAuthApi,
        },
        {provide: NotificationsFacade, useValue: mockedNotificationsFacade},
      ],
    });

    store = TestBed.inject(MockStore);
    mockedIsAuthenticatedSelector = store.overrideSelector(
      selectIsAuthenticated,
      userIsAuthenticated,
    );
    service = TestBed.inject(AuthFacade);
  };

  describe('attempt login', () => {
    beforeEach(async(() => {
      configureTestingModule(false);
    }));

    it('should dispatch the correct state actions', () => {
      spyOn(store, 'dispatch').and.callThrough();

      service.attemptLogin('ali@techhive.io', '123123')
        .subscribe((user: User) => {
          expect(user.id).toEqual(MOCKED_AUTH_STATE.user.id);
          expect(store.dispatch).toHaveBeenCalledTimes(1);
          expect(store.dispatch).toHaveBeenCalledWith(actionLogin({payload: MOCKED_AUTH_STATE}));
        });
    });
  });

  describe('signOut', () => {
    beforeEach(async(() => {
      configureTestingModule(false);
    }));

    it('should dispatch a logout action', () => {
      spyOn(store, 'dispatch').and.callThrough();

      service.signOut();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actionLogout({}));
    });
  });

  describe('isAuthenticated', () => {
    describe('When user is not logged in', () => {
      beforeEach(async(() => {
        configureTestingModule(false);
      }));

      it('should return false', () => {
        service.isAuthenticated()
          .subscribe((isAuthenticated: boolean) => {
            expect(isAuthenticated).toBe(false);
          });
      });
    });

    describe('When user is logged in', () => {
      beforeEach(async(() => {
        configureTestingModule(true);
      }));

      it('should return true', () => {
        service.isAuthenticated()
          .subscribe((isAuthenticated: boolean) => {
            expect(isAuthenticated).toBe(true);
          });
      });
    });
  });

  describe('register', () => {
    beforeEach(async(() => {
      configureTestingModule(false);
    }));

    const data = MOCKED_API_USER;
    const mockedPassword = 'mockedPassword';

    describe('When the request goes through', () => {
      it('should call the correct auth api function', () => {
        mockedAuthApi.register.and.returnValue(of({}));

        service.register(data.first_name, data.last_name, data.email, mockedPassword)
          .pipe(take(1))
          .subscribe((res) => {
            expect(mockedAuthApi.register).toHaveBeenCalledTimes(1);
            expect(mockedAuthApi.register).toHaveBeenCalledWith(data.first_name, data.last_name, data.email, mockedPassword);
            expect(res).toEqual({});
          });
      });
    });

    describe('When the request errors', () => {
      it('should display an error notification', () => {
        mockedAuthApi.register.and.returnValue(throwError('err'));

        service.register(data.first_name, data.last_name, data.email, mockedPassword)
          .pipe(take(1))
          .subscribe(() => {
            },
            error => {
              expect(mockedNotificationsFacade.displayErrorMessage).toHaveBeenCalledTimes(1);
            });
      });
    });
  });

  describe('decodeVerificationToken', () => {
    beforeEach(async(() => {
      configureTestingModule(false);
    }));

    it('should call the correct function in auth api', () => {
      service.decodeVerificationToken(MOCKED_CONFIRMATION_EMAIL_TOKEN.token);

      expect(mockedAuthApi.fetchVerificationTokenInfo).toHaveBeenCalledTimes(1);
      expect(mockedAuthApi.fetchVerificationTokenInfo).toHaveBeenCalledWith(MOCKED_CONFIRMATION_EMAIL_TOKEN.token);
    });
  });
});

import {AuthFacade} from './auth-facade.service';
import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {MemoizedSelector} from '@ngrx/store';
import {selectIsAuthenticated} from '../store/auth.selectors';
import {actionLogin} from '../store/authActionTypes';
import {AuthApi} from './auth-api.service';
import {AuthStateInterface} from '../../../shared/models/authState.model';
import {User} from '../../../shared/models/user.model';
import {MOCKED_AUTH_STATE} from '../../../shared/mocks/auth.mocks';
import {NotificationsFacade} from '../../services';

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
    mockedAuthApi = jasmine.createSpyObj('AuthApi', ['login']);
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
});

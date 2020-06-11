import {AuthFacade} from './auth-facade.service';
import {AuthApi} from '../api';
import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {MOCKED_AUTH_STATE} from '../mocks/auth.mocks';
import {AuthStateInterface} from '../models/authState.model';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {User} from '../models/user.model';
import {actionLogin} from '../store/auth/auth.actions';

describe('Auth Facade Service', () => {
  const mockedInitialAuthState: AuthStateInterface = {
    token: '',
    user: null,
  };

  let service: AuthFacade;
  let mockedAuthApi: jasmine.SpyObj<AuthApi>;
  let store: MockStore;

  const configureTestingModule: () => void = () => {
    mockedAuthApi = jasmine.createSpyObj('AuthApi', ['login']);
    mockedAuthApi.login.and.returnValue(of(MOCKED_AUTH_STATE));

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthFacade,
        provideMockStore({initialState: mockedInitialAuthState}),
        {
          provide: AuthApi, useValue: mockedAuthApi,
        }
      ],
    });

    store = TestBed.inject(MockStore);
    service = TestBed.inject(AuthFacade);
  };

  describe('attempt login', () => {
    beforeEach(async(() => {
      configureTestingModule();
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
});

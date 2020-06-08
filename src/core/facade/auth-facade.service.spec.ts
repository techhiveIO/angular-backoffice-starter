import {AuthFacade} from './auth-facade.service';
import {AuthApi} from '../api';
import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {MOCKED_AUTH_STATE} from '../mocks/auth.mocks';
import {AuthStateInterface} from '../models/authState.model';
import {provideMockStore} from '@ngrx/store/testing';
import {take} from 'rxjs/operators';
import {User} from '../models/user.model';

describe('Auth Facade Service', () => {
  const mockedInitialAuthState: AuthStateInterface = {
    token: '',
    user: null,
  };

  let service: AuthFacade;
  let mockedAuthApi: jasmine.SpyObj<AuthApi>;

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

    service = TestBed.get(AuthFacade);
  };

  describe('attempt login', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    it('should dispatch the correct state actions', () => {
      service.attemptLogin('ali@techhive.io', '123123')
        .pipe(take(1))
        .subscribe((user: User) => {
          expect(user.id).toEqual(MOCKED_AUTH_STATE.user.id);
        });
    });
  });
});

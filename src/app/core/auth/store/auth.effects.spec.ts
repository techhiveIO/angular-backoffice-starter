import {AuthStoreEffects} from './auth.effects';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {async, TestBed} from '@angular/core/testing';
import {actionLogin, actionLogout, AuthActionTypes} from './authActionTypes';
import {RouterTestingModule} from '@angular/router/testing';
import {LocalStorageFacade} from '../../services';
import {Router} from '@angular/router';
import {MOCKED_AUTH_STATE} from '../../../shared/mocks/auth.mocks';
import {ROUTES_GENERAL} from '../../../app-routing.module';

describe('Auth State Effects', () => {
  let effects: AuthStoreEffects;
  let mockedLocalStorageFacade: jasmine.SpyObj<LocalStorageFacade>;
  let mockedRouter: jasmine.SpyObj<Router>;
  let store: MockStore;

  const configureTestingModule: () => void = () => {
    mockedLocalStorageFacade = jasmine.createSpyObj(LocalStorageFacade, ['setAuthToken', 'getAuthToken', 'clearAuthData']);
    mockedRouter = jasmine.createSpyObj('Router', ['navigate']);


    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthStoreEffects,
        provideMockStore(),
        {provide: Router, useValue: mockedRouter},
        {
          provide: LocalStorageFacade, useValue: mockedLocalStorageFacade,
        }
      ],
    });

    store = TestBed.inject(MockStore);
    effects = TestBed.inject(AuthStoreEffects);
  };

  describe('on login', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    it('should set persist the auth token to localstorage and navigate to root', () => {
      effects.login$.subscribe((action) => {
        expect(action.type).toEqual(AuthActionTypes.LOGIN);
        expect(action.payload).toEqual(MOCKED_AUTH_STATE);
        expect(mockedLocalStorageFacade.setAuthToken).toHaveBeenCalledTimes(1);
        expect(mockedRouter.navigate).toHaveBeenCalledTimes(1);
        expect(mockedRouter.navigate).toHaveBeenCalledWith(['/']);
      });

      store.dispatch(actionLogin({payload: MOCKED_AUTH_STATE}));
    });
  });

  describe('on logout', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    it('should clear the localstorage data and navigate to root', () => {
      effects.logout$.subscribe((action) => {
        expect(action.type).toEqual(AuthActionTypes.LOGOUT);
        expect(mockedLocalStorageFacade.clearAuthData).toHaveBeenCalledTimes(1);
        expect(mockedRouter.navigate).toHaveBeenCalledTimes(1);
        expect(mockedRouter.navigate).toHaveBeenCalledWith([ROUTES_GENERAL.AUTH]);
      });

      store.dispatch(actionLogout({}));
    });
  });

});

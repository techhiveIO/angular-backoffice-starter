import {AuthGuardService} from './auth.guard';
import {of} from 'rxjs';
import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthFacade} from '../auth/services';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let mockedAuthFacade: jasmine.SpyObj<AuthFacade>;

  const configureTestingModule: (authenticated: boolean) => void = (authenticated) => {
    mockedAuthFacade = jasmine.createSpyObj(AuthFacade, ['isAuthenticated']);
    mockedAuthFacade.isAuthenticated.and.returnValue(of(authenticated));

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: AuthFacade, useValue: mockedAuthFacade},
        AuthGuardService,
      ],
    });

    service = TestBed.inject(AuthGuardService);
  };

  describe('isAuthenticated', () => {
    describe('When the auth token exists', () => {
      beforeEach(async(() => {
        configureTestingModule(true);
      }));

      it('should return true', () => {
        service.canActivate()
          .subscribe((canPass: boolean) => {
            expect(canPass).toBe(true);
          });

        expect(mockedAuthFacade.isAuthenticated).toHaveBeenCalledTimes(1);
      });
    });

    describe('When the auth token does not exist', () => {
      beforeEach(async(() => {
        configureTestingModule(false);
      }));

      it('should return false', () => {
        service.canActivate()
          .subscribe((canPass: boolean) => {
            expect(canPass).toBe(false);
          });

        expect(mockedAuthFacade.isAuthenticated).toHaveBeenCalledTimes(1);
      });
    });
  });
});

import {ResetPasswordResolver} from './reset-password.resolver';
import {async, TestBed} from '@angular/core/testing';
import {AuthFacade} from '../../../core/auth/services';
import {of} from 'rxjs';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {ResetPasswordViewInterface, ResetPasswordViewType} from '../models/view-types.model';

describe('ResetPasswordResolver', () => {
  const MOCKED_RESET_TOKEN = 'mockedResetToken';
  const MOCKED_EMAIL_ATTEMPT = 'ali@techhive.io';

  let service: ResetPasswordResolver;
  let route: ActivatedRoute;
  let mockedAuthFacade: jasmine.SpyObj<AuthFacade>;
  let mockedActivatedRoute: Partial<ActivatedRouteSnapshot>;

  const configureTestingModule = (attemptedEmail: boolean = false, token: boolean = false) => {
    mockedAuthFacade = jasmine.createSpyObj(AuthFacade, ['fetchStoredEmailAttempt']);
    mockedAuthFacade.fetchStoredEmailAttempt.and.returnValue(of(attemptedEmail ? MOCKED_EMAIL_ATTEMPT : null));
    mockedActivatedRoute = {
      params: {
        token: token ? MOCKED_RESET_TOKEN : '',
      },
    };

    TestBed.configureTestingModule({
      providers: [
        ResetPasswordResolver,
        {provide: AuthFacade, useValue: mockedAuthFacade},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: mockedActivatedRoute,
          }
        }
      ],
    });

    service = TestBed.inject(ResetPasswordResolver);
    route = TestBed.inject(ActivatedRoute);
  };

  describe('resolve', () => {
    describe('When no emailAttempted or Token is presented', () => {
      beforeEach(async(() => {
        configureTestingModule();
      }));

      it('should return the new_request view config without an email attempt', () => {
        service.resolve(route.snapshot)
          .subscribe((data: ResetPasswordViewInterface) => {
            expect(data.viewType).toEqual(ResetPasswordViewType.TYPE_NEW_REQUEST);
            expect(data.resetToken).not.toBeTruthy();
            expect(data.attemptedEmail).not.toBeTruthy();
          });
      });
    });

    describe('When no token is present but an email attempt is registered', () => {
      beforeEach(async(() => {
        configureTestingModule(true, false);
      }));

      it('should return the new_request view config with a registered email', () => {
        service.resolve(route.snapshot)
          .subscribe((data: ResetPasswordViewInterface) => {
            expect(data.viewType).toEqual(ResetPasswordViewType.TYPE_NEW_REQUEST);
            expect(data.resetToken).not.toBeTruthy();
            expect(data.attemptedEmail).toEqual(MOCKED_EMAIL_ATTEMPT);
          });
      });
    });

    describe('When a token is provided', () => {
      beforeEach(async(() => {
        configureTestingModule(false, true);
      }));

      it('it should return the reset_token view config', () => {
        service.resolve(route.snapshot)
          .subscribe((data: ResetPasswordViewInterface) => {
            expect(data.viewType).toEqual(ResetPasswordViewType.TYPE_RESET_TOKEN);
            expect(data.resetToken).toEqual(MOCKED_RESET_TOKEN);
            expect(data.attemptedEmail).not.toBeTruthy();
          });
      });
    });
  });
});

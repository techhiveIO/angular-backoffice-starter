import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmEmailPageComponent} from './confirm-email.page';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';
import {
  MOCKED_CONFIRM_ACCOUNT_VIEW_EXPIRED, MOCKED_CONFIRM_ACCOUNT_VIEW_INVITATION,
  MOCKED_CONFIRM_ACCOUNT_VIEW_VERIFY,
} from '../../../../shared/mocks/auth.mocks';
import {SharedModule} from '../../../../shared/shared.module';
import {By} from '@angular/platform-browser';
import {AuthFacade} from '../../../../core/auth/services';
import {ConfirmAccountViewInterface} from '../../models/view-types.model';

describe('ConfirmEmailPageComponent', () => {
  let fixture: ComponentFixture<ConfirmEmailPageComponent>;
  let component: ConfirmEmailPageComponent;
  let mockedActivatedRoute: Partial<ActivatedRoute>;
  let mockedAuthFacade: jasmine.SpyObj<AuthFacade>;
  let mockedRouter: jasmine.SpyObj<Router>;

  const configureTestingModule = (viewConfig: ConfirmAccountViewInterface) => {
    mockedActivatedRoute = {
      data: of({viewConfig}),
    };
    mockedAuthFacade = jasmine.createSpyObj(AuthFacade, ['register', 'confirmRegistration']);
    mockedAuthFacade.register.and.returnValue(of({}));
    mockedAuthFacade.confirmRegistration.and.returnValue(of(true));
    mockedRouter = jasmine.createSpyObj(Router, ['navigate']);

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ConfirmEmailPageComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockedActivatedRoute},
        {provide: AuthFacade, useValue: mockedAuthFacade},
        {provide: Router, useValue: mockedRouter},
      ]
    }).compileComponents();
  };

  const initializeTestComponent: () => void = (): void => {
    fixture = TestBed.createComponent(ConfirmEmailPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  describe('ngOnInit', () => {
    describe('expiredToken', () => {
      beforeEach(async(() => {
        configureTestingModule(MOCKED_CONFIRM_ACCOUNT_VIEW_EXPIRED);
      }));

      beforeEach(() => {
        initializeTestComponent();
      });

      it('should display the expired token view', () => {
        const view = fixture.debugElement.query(By.css('#templateExpiredToken'));
        expect(view).toBeTruthy();
      });
    });

    // describe('confirmationToken', () => {
    //   beforeEach(async(() => {
    //     configureTestingModule(MOCKED_CONFIRM_ACCOUNT_VIEW_VERIFY);
    //   }));
    //
    //   beforeEach(() => {
    //     initializeTestComponent();
    //   });
    //
    //   it('should display the confirmation token view', () => {
    //     const view = fixture.debugElement.query(By.css('#templateConfirmationToken'));
    //     expect(view).toBeTruthy();
    //   });
    // });

    describe('invitationToken', () => {
      beforeEach(async(() => {
        configureTestingModule(MOCKED_CONFIRM_ACCOUNT_VIEW_INVITATION);
      }));

      beforeEach(() => {
        initializeTestComponent();
      });

      it('should display the verification token view', () => {
        const view = fixture.debugElement.query(By.css('#templateInvitationToken'));
        expect(view).toBeTruthy();
      });
    });
  });
});

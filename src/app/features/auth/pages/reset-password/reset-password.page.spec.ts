import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResetPasswordPageComponent} from './reset-password.page';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthFacade} from '../../../../core/auth/services';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';
import {ResetPasswordViewInterface, ResetPasswordViewType} from '../../models/view-types.model';
import {MOCKED_NEW_REQUEST_VIEW_CONFIG, MOCKED_RESET_TOKEN_VIEW_CONFIG} from '../../../../shared/mocks/reset-password.mocks';
import {By} from '@angular/platform-browser';
import {ROUTES_AUTH} from '../../../../shared/consts/routes.consts';

describe('ResetPasswordPage', () => {
  const mockedNewRequestFormGroup: FormGroup = new FormBuilder().group({
    attemptedEmail: ['', [Validators.required, Validators.email]],
  });

  let fixture: ComponentFixture<ResetPasswordPageComponent>;
  let component: ResetPasswordPageComponent;
  let mockedFormBuilder: jasmine.SpyObj<FormBuilder>;
  let mockedAuthFacade: jasmine.SpyObj<AuthFacade>;
  let mockedRouter: jasmine.SpyObj<Router>;
  let mockedActivatedRoute: Partial<ActivatedRoute>;

  const configureTestingModule = (viewConfig: ResetPasswordViewInterface) => {
    mockedFormBuilder = jasmine.createSpyObj(FormBuilder, ['group']);
    mockedFormBuilder.group.and.returnValue(mockedNewRequestFormGroup);
    mockedAuthFacade = jasmine.createSpyObj(AuthFacade, ['clearEmailAttempt', 'requestPasswordReset']);
    mockedAuthFacade.requestPasswordReset.and.returnValue(of(true));
    mockedRouter = jasmine.createSpyObj(Router, ['navigate']);
    mockedActivatedRoute = {
      data: of({viewConfig}),
    };

    TestBed.configureTestingModule({
      declarations: [ResetPasswordPageComponent],
      providers: [
        {provide: FormBuilder, useValue: mockedFormBuilder},
        {provide: AuthFacade, useValue: mockedAuthFacade},
        {provide: Router, useValue: mockedRouter},
        {provide: ActivatedRoute, useValue: mockedActivatedRoute},
      ],
    }).compileComponents();
  };

  const initializeTestComponent: () => void = (): void => {
    fixture = TestBed.createComponent(ResetPasswordPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  describe('ngOnInit', () => {
    describe('New Request', () => {
      beforeEach(async(() => {
        configureTestingModule(MOCKED_NEW_REQUEST_VIEW_CONFIG);
      }));

      beforeEach(() => {
        initializeTestComponent();
      });

      it('should set up the new request view', () => {
        const view = fixture.debugElement.query(By.css('#templateNewRequest'));
        expect(view).toBeTruthy();
        expect(component.viewConfig).toEqual(MOCKED_NEW_REQUEST_VIEW_CONFIG);
        expect(mockedFormBuilder.group).toHaveBeenCalledTimes(1);
        expect(mockedFormBuilder.group).toHaveBeenCalledWith({
          attemptedEmail: [MOCKED_NEW_REQUEST_VIEW_CONFIG.attemptedEmail, [Validators.required, Validators.email]],
        });
      });
    });

    describe('Reset Token', () => {
      beforeEach(async(() => {
        configureTestingModule(MOCKED_RESET_TOKEN_VIEW_CONFIG);
      }));

      beforeEach(() => {
        initializeTestComponent();
      });

      it('should set up the reset token view', () => {
        const view = fixture.debugElement.query(By.css('#templateResetToken'));
        expect(view).toBeTruthy();
        expect(component.viewConfig).toEqual(MOCKED_RESET_TOKEN_VIEW_CONFIG);
        expect(mockedFormBuilder.group).toHaveBeenCalledTimes(1);
        expect(mockedFormBuilder.group).toHaveBeenCalledWith({
          password: ['', Validators.required],
        });
      });
    });
  });

  describe('requestAPasswordReset', () => {
    beforeEach(async(() => {
      configureTestingModule(MOCKED_NEW_REQUEST_VIEW_CONFIG);
    }));

    beforeEach(() => {
      initializeTestComponent();
    });

    it('should call the correct auth facade function', () => {
      component.requestAPasswordReset();

      expect(mockedAuthFacade.requestPasswordReset).toHaveBeenCalledTimes(1);
      expect(component.viewConfig).toEqual({
        ...MOCKED_NEW_REQUEST_VIEW_CONFIG,
        viewType: ResetPasswordViewType.TYPE_EMAIL_SENT,
      });
    });

    it('should clear attempted email data and redirect the user to login on success', () => {
      jasmine.clock().install();
      component.requestAPasswordReset();
      jasmine.clock().tick(5000);

      expect(mockedAuthFacade.clearEmailAttempt).toHaveBeenCalledTimes(1);
      expect(mockedRouter.navigate).toHaveBeenCalledTimes(1);
      expect(mockedRouter.navigate).toHaveBeenCalledWith([`/auth/${ROUTES_AUTH.LOGIN}`]);
      jasmine.clock().uninstall();
    });
  });
});

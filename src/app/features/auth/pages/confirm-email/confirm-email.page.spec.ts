import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmEmailPageComponent} from './confirm-email.page';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {MOCKED_CONFIRMATION_EMAIL_TOKEN, MOCKED_EXPIRED_TOKEN, MOCKED_INVITATION_EMAIL_TOKEN} from '../../../../shared/mocks/auth.mocks';
import {SharedModule} from '../../../../shared/shared.module';
import {ConfirmationTokenInterface} from '../../../../shared/models/authState.model';
import {By} from '@angular/platform-browser';

describe('ConfirmEmailPageComponent', () => {
  let fixture: ComponentFixture<ConfirmEmailPageComponent>;
  let component: ConfirmEmailPageComponent;
  let mockedActivatedRoute: Partial<ActivatedRoute>;

  const configureTestingModule = (token: ConfirmationTokenInterface) => {
    mockedActivatedRoute = {
      data: of({token}),
    };

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ConfirmEmailPageComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockedActivatedRoute},
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
        configureTestingModule(MOCKED_EXPIRED_TOKEN);
      }));

      beforeEach(() => {
        initializeTestComponent();
      });

      it('should display the expired token view', () => {
        const view = fixture.debugElement.query(By.css('#templateExpiredToken'));
        expect(view).toBeTruthy();
      });
    });

    describe('confirmationToken', () => {
      beforeEach(async(() => {
        configureTestingModule(MOCKED_CONFIRMATION_EMAIL_TOKEN);
      }));

      beforeEach(() => {
        initializeTestComponent();
      });

      it('should display the confirmation token view', () => {
        const view = fixture.debugElement.query(By.css('#templateConfirmationToken'));
        expect(view).toBeTruthy();
      });
    });

    describe('invitationToken', () => {
      beforeEach(async(() => {
        configureTestingModule(MOCKED_INVITATION_EMAIL_TOKEN);
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

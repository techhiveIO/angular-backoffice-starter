import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SignupPageComponent} from './sign-up.page';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {AuthFacade} from '../../../../core/auth/services';
import {of} from 'rxjs';

describe('SignUpPage', () => {
  let fixture: ComponentFixture<SignupPageComponent>;
  let component: SignupPageComponent;
  let mockedAuthFacade: jasmine.SpyObj<AuthFacade>;

  const configureTestingModule: () => void = () => {
    mockedAuthFacade = jasmine.createSpyObj('AuthFacade', ['register']);
    mockedAuthFacade.register.and.returnValue(of({}));

    TestBed.configureTestingModule({
      imports: [
        BrowserTestingModule
      ],
      declarations: [SignupPageComponent],
      providers: [
        {provide: AuthFacade, useValue: mockedAuthFacade},
      ],
    }).compileComponents();
  };

  const initializeTestComponent: () => void = (): void => {
    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  describe('OnSubmit', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    beforeEach(() => {
      initializeTestComponent();
    });

    it('should call the correct register authFacade function', () => {

      const mockedFormData = {
        firstName: 'fname',
        lastName: 'lname',
        email: 'ali@techhive.io',
        password: '123123123',
      };

      component.onSubmit(mockedFormData);
      expect(mockedAuthFacade.register).toHaveBeenCalledTimes(1);
      expect(mockedAuthFacade.register).toHaveBeenCalledWith(
        mockedFormData.firstName,
        mockedFormData.lastName,
        mockedFormData.email,
        mockedFormData.password
      );
    });
  });
});

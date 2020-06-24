import {LoginPageComponent} from './login.page';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {AuthFacade} from '../../../../core/auth/services';

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;
  let mockedFormBuilder: jasmine.SpyObj<FormBuilder>;
  let mockedAuthFacade: jasmine.SpyObj<AuthFacade>;

  const mockedFormGroup: FormGroup = new FormBuilder().group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  const configureTestingModule: () => void = () => {
    mockedFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
    mockedFormBuilder.group.and.returnValue(mockedFormGroup);
    mockedAuthFacade = jasmine.createSpyObj('AuthFacade', ['attemptLogin']);

    TestBed.configureTestingModule({
      imports: [
        BrowserTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [LoginPageComponent],
      providers: [
        {provide: FormBuilder, useValue: mockedFormBuilder},
        {provide: AuthFacade, useValue: mockedAuthFacade},
      ],
    }).compileComponents();
  };

  const initializeTestComponent: () => void = (): void => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  describe('onInit', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    beforeEach(() => {
      initializeTestComponent();
    });

    it('should build the login form', () => {
      expect(mockedFormBuilder.group).toHaveBeenCalledTimes(1);
      expect(mockedFormBuilder.group).toHaveBeenCalledWith({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        rememberMe: [false],
      });
    });
  });

  describe('OnSubmit', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    beforeEach(() => {
      initializeTestComponent();
    });
  });
});

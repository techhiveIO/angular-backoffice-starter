import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SignupPageComponent} from './sign-up.page';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BrowserTestingModule} from '@angular/platform-browser/testing';

describe('SignUpPage', () => {
  let fixture: ComponentFixture<SignupPageComponent>;
  let component: SignupPageComponent;
  let mockedFormBuilder: jasmine.SpyObj<FormBuilder>;

  const mockedFormGroup: FormGroup = new FormBuilder().group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  const configureTestingModule: () => void = () => {
    mockedFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
    mockedFormBuilder.group.and.returnValue(mockedFormGroup);

    TestBed.configureTestingModule({
      imports: [
        BrowserTestingModule
      ],
      declarations: [SignupPageComponent],
      providers: [
        {provide: FormBuilder, useValue: mockedFormBuilder},
      ],
    }).compileComponents();
  };

  const initializeTestComponent: () => void = (): void => {
    fixture = TestBed.createComponent(SignupPageComponent);
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
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    });
  });

  describe('toggleHidePassword', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    beforeEach(() => {
      initializeTestComponent();
    });

    it('should invert the hidden flag if clicked', () => {
      const defaultFlagValue = false;
      component.hidden = defaultFlagValue;
      component.toggleHidePassword();

      expect(component.hidden).not.toBe(defaultFlagValue);
    });
  });

  describe('OnSubmit', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    beforeEach(() => {
      initializeTestComponent();
    });

    it('should set the loading flag', () => {
      component.onSubmit();
      expect(component.isLoading).toBe(true);
    });
  });
});

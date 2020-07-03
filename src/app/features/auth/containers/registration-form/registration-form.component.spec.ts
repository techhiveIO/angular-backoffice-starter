import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RegistrationFormComponent} from './registration-form.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

describe('RegistrationFormComponent', () => {
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let component: RegistrationFormComponent;
  let mockedFormBuilder: jasmine.SpyObj<FormBuilder>;

  const mockedFormGroup: FormGroup = new FormBuilder().group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  const configureTestingModule = () => {
    mockedFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
    mockedFormBuilder.group.and.returnValue(mockedFormGroup);

    TestBed.configureTestingModule({
      declarations: [
        RegistrationFormComponent,
      ],
      providers: [
        {provide: FormBuilder, useValue: mockedFormBuilder},
      ],
    }).compileComponents();
  };

  const initializeTestComponent: () => void = (): void => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  describe('ngOnInit', () => {
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
      component.passwordHidden = defaultFlagValue;
      component.toggleHidePassword();

      expect(component.passwordHidden).not.toBe(defaultFlagValue);
    });
  });

  describe('onSubmit', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    beforeEach(() => {
      initializeTestComponent();
    });

    it('should emit a dump of the form', () => {
      spyOn(component.submitForm, 'emit');

      const mockedFormData = {
        firstName: 'fname',
        lastName: 'lname',
        email: 'ali@techhive.io',
        password: '123123123',
      };

      component.formGroup.patchValue(mockedFormData);
      component.onSubmit();
      expect(component.submitForm.emit).toHaveBeenCalledTimes(1);
      expect(component.submitForm.emit).toHaveBeenCalledWith(mockedFormData);
    });
  });
});

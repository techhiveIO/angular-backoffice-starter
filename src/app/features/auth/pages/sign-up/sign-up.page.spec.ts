import {TestBed} from '@angular/core/testing';
import {SignupPageComponent} from './sign-up.page';

describe('SignUpPage', () => {
  let page: SignupPageComponent;

  const configureTestingModule: () => void = () => {
    TestBed.configureTestingModule({
      declarations: [SignupPageComponent],
    });

    page = TestBed.inject(SignupPageComponent);
  };
});

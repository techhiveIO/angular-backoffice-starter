import {LoginPageComponent} from './login.page';
import {TestBed} from '@angular/core/testing';

describe('LoginPage', () => {
  let page: LoginPageComponent;

  const configureTestingModule: () => void = () => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
    });

    page = TestBed.inject(LoginPageComponent);
  };
});

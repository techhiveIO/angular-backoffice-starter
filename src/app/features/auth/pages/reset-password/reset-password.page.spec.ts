import {TestBed} from '@angular/core/testing';
import {ResetPasswordPageComponent} from './reset-password.page';

describe('ResetPasswordPage', () => {
  let page: ResetPasswordPageComponent;

  const configureTestingModule: () => void = () => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordPageComponent],
    });

    page = TestBed.inject(ResetPasswordPageComponent);
  };
});

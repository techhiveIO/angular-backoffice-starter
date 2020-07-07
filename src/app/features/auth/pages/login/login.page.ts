import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthFacade} from '../../../../core/auth/services';
import {Router} from '@angular/router';
import {ROUTES_AUTH} from '../../../../shared/consts/routes.consts';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', '../../auth.theme.scss'],
})

export class LoginPageComponent implements OnInit {
  formGroup: FormGroup;
  isLoading = false;
  displayForgotPasswordLink = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSubmit() {
    const data = this.formGroup.getRawValue();

    this.isLoading = true;
    this.authFacade.attemptLogin(data.email, data.password)
      .subscribe(() => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.displayForgotPasswordLink = true;
        });
  }

  requestNewPassword(): void {
    if (this.formGroup.get('email').valid) {
      this.authFacade.storeEmailAttempt(this.formGroup.get('email').value);
    }

    void this.router.navigate([`auth/${ROUTES_AUTH.RESET_PASSWORD}`]);
  }
}

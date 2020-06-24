import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthFacade} from '../../../../core/auth/services';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', '../auth.theme.scss'],
})

export class LoginPageComponent implements OnInit {
  formGroup: FormGroup;
  isLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authFacade: AuthFacade,
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
          this.isLoading = true;
        });
  }
}

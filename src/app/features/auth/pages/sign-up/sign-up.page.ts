import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthFacade} from '../../../../core/auth/services';

@Component({
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss', '../auth.theme.scss'],
})

export class SignupPageComponent implements OnInit {
  formGroup: FormGroup;
  isLoading = false;

  hidden = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authFacade: AuthFacade
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleHidePassword(): void {
    this.hidden = !this.hidden;
  }

  onSubmit() {
    this.isLoading = true;
    const data = this.formGroup.getRawValue();

    this.authFacade.register(data.firstName, data.lastName, data.email, data.password)
      .subscribe((res) => {
          console.log('fefe', res);
        }
      );
  }
}

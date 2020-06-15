import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss', '../auth.theme.scss'],
})

export class SignupPageComponent implements OnInit {
  formGroup: FormGroup;
  isLoading = false;

  hidden = true;

  constructor(
    private readonly formBuilder: FormBuilder
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
  }
}

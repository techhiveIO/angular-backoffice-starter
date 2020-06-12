import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', '../auth.theme.scss'],
})

export class LoginPageComponent implements OnInit {
  formGroup: FormGroup;
  isLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder
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
    this.isLoading = true;
  }
}

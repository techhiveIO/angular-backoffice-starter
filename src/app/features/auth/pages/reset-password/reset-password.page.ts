import {Component, OnInit} from '@angular/core';
import {AuthFacade} from '../../../../core/auth/services';
import {take} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss', '../../auth.theme.scss'],
})

export class ResetPasswordPageComponent implements OnInit {
  isLoading = false;
  formGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authFacade: AuthFacade,
  ) {
  }

  ngOnInit(): void {
    this.authFacade.fetchStoredEmailAttempt()
      .pipe(take(1))
      .subscribe((email: string) => {
        this.formGroup = this.buildEmailForm(email);
      });
  }

  requestAPasswordReset(): void {
    this.isLoading = true;
    const email = this.formGroup.get('attemptedEmail').value;

    this.authFacade.requestPasswordReset(email)
      .subscribe((success: boolean) => {
        this.isLoading = false;
      });
  }

  private buildEmailForm(attemptedEmail: string): FormGroup {
    return this.formBuilder.group({
      attemptedEmail: [attemptedEmail, Validators.required],
    });
  }
}

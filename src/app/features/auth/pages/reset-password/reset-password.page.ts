import {Component, OnInit} from '@angular/core';
import {AuthFacade} from '../../../../core/auth/services';
import {take} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ROUTES_AUTH} from '../../../../shared/consts/routes.consts';

@Component({
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss', '../../auth.theme.scss'],
})

export class ResetPasswordPageComponent implements OnInit {
  isLoading = false;
  formGroup: FormGroup;

  emailSent = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
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
        this.emailSent = success;
        this.isLoading = false;
        this.redirectUserToLogin();
      });
  }

  private buildEmailForm(attemptedEmail: string): FormGroup {
    return this.formBuilder.group({
      attemptedEmail: [attemptedEmail, Validators.required],
    });
  }

  private redirectUserToLogin(): void {
    setTimeout(() => {
      void this.router.navigate([`/auth/${ROUTES_AUTH.LOGIN}`]);
    }, 5000);
  }
}

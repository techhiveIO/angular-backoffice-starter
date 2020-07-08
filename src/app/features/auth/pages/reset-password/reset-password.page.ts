import {Component, OnInit} from '@angular/core';
import {AuthFacade} from '../../../../core/auth/services';
import {map, take} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ROUTES_AUTH} from '../../../../shared/consts/routes.consts';
import {ResetPasswordViewInterface, ResetPasswordViewType} from '../../models/view-types.model';

@Component({
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss', '../../auth.theme.scss'],
})

export class ResetPasswordPageComponent implements OnInit {
  isLoading = false;
  formGroup: FormGroup;

  allViewTypes = ResetPasswordViewType;
  viewConfig: ResetPasswordViewInterface;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        take(1),
        map((data: { viewConfig: ResetPasswordViewInterface }) => data.viewConfig),
      )
      .subscribe(this.setUpView);
  }

  requestAPasswordReset(): void {
    this.isLoading = true;
    const email = this.formGroup.get('attemptedEmail').value;

    this.authFacade.requestPasswordReset(email)
      .subscribe((success: boolean) => {
        this.viewConfig = {
          ...this.viewConfig,
          viewType: ResetPasswordViewType.TYPE_EMAIL_SENT,
        };

        this.isLoading = false;
        this.redirectUserToLogin();
      });
  }

  changePassword(): void {
    this.isLoading = true;
  }

  /**
   * This function sets up the components view. This component will be used in multiple ways depending on the provided config.
   * @param config: config containing the viewType and other supporting values.
   */
  private setUpView = (config: ResetPasswordViewInterface): void => {
    switch (config.viewType) {
      case ResetPasswordViewType.TYPE_RESET_TOKEN:
        this.formGroup = this.buildResetPasswordForm();
        break;
      case ResetPasswordViewType.TYPE_NEW_REQUEST:
      default:
        this.formGroup = this.buildEmailForm(config.attemptedEmail);
    }

    this.viewConfig = config;
  }

  /**
   * This function sets up the form for requesting a password reset token.
   * If we have a registered login attempt, then we can set up the attempted email by default.
   * @param attemptedEmail: Email in the registered login attempt.
   */
  private buildEmailForm(attemptedEmail: string): FormGroup {
    return this.formBuilder.group({
      attemptedEmail: [attemptedEmail, [Validators.required, Validators.email]],
    });
  }

  /**
   * This function sets up the form for entering a new password.
   */
  private buildResetPasswordForm(): FormGroup {
    return this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  /**
   * We call this function after a user has successfully requested a password reset.
   * We clear all state data related to making that request, then take the user back to login.
   */
  private redirectUserToLogin(): void {
    setTimeout(() => {
      this.authFacade.clearEmailAttempt();
      void this.router.navigate([`/auth/${ROUTES_AUTH.LOGIN}`]);
    }, 5000);
  }
}

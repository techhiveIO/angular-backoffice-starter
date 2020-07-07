import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmAccountViewInterface, ConfirmAccountViewType} from '../../models/view-types.model';
import {ROUTES_AUTH} from '../../../../shared/consts/routes.consts';
import {AuthFacade} from '../../../../core/auth/services';
import {User} from '../../../../shared/models/user.model';
import {map, take} from 'rxjs/operators';

@Component({
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss', '../../auth.theme.scss'],
})

export class ConfirmEmailPageComponent implements OnInit {
  isLoading = false;

  viewConfig: ConfirmAccountViewInterface;
  allViewTypes = ConfirmAccountViewType;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      take(1),
      map((data: { viewConfig: ConfirmAccountViewInterface }) => data.viewConfig)
    ).subscribe(this.prepareView);
  }

  onRequestNewEmail(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  /**
   * This function is used for accounts that have been invited by an admin rather than have signed up on their own.
   * These users were invited by email, and still need to input information like their name, mobile, and password.
   */
  createAccount(data: Partial<User>): void {
    this.isLoading = true;

    this.authFacade.register(data.firstName, data.lastName, data.email, data.password, this.viewConfig.token)
      .subscribe(this.onConfirmAccountSuccess, this.onTokenExpired);
  }

  /**
   * Navigates to the login page.
   */
  navigateToLogin(): void {
    void this.router.navigate([`auth/${ROUTES_AUTH.LOGIN}`]);
  }

  /**
   * This function is used to activate accounts that have signed up to the platform on their own. These users do not
   * need to enter any further information.
   */
  private confirmAccount(): void {
    this.isLoading = true;

    this.authFacade.confirmRegistration(this.viewConfig.token)
      .subscribe(this.onConfirmAccountSuccess, this.onTokenExpired);
  }

  /**
   * Once an account has been verified successfully, this function sets the correct view,
   * disables loading, and takes the user back to login.
   */
  private onConfirmAccountSuccess = () => {
    this.viewConfig = {
      ...this.viewConfig,
      viewType: ConfirmAccountViewType.TYPE_ACCOUNT_VERIFIED,
    };

    this.isLoading = false;

    setTimeout(() => {
      this.navigateToLogin();
    }, 5000);
  };

  /**
   * This function is an error handler for account verification api calls. It sets up the correct error view and disables loading.
   */
  private onTokenExpired = () => {
    this.viewConfig = {
      ...this.viewConfig,
      viewType: ConfirmAccountViewType.TYPE_TOKEN_EXPIRED,
    };

    this.isLoading = false;
  };

  private prepareView = (config: ConfirmAccountViewInterface): void => {
    this.viewConfig = config;

    switch (config.viewType) {
      case ConfirmAccountViewType.TYPE_ACCEPT_INVITATION:
        break;
      case ConfirmAccountViewType.TYPE_CONFIRM_REGISTRATION:
      default:
        this.confirmAccount();
    }
  };
}

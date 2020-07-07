import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmAccountViewInterface, ConfirmAccountViewType} from '../../models/view-types.model';
import {ROUTES_AUTH} from '../../../../shared/consts/routes.consts';
import {AuthFacade} from '../../../../core/auth/services';

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
    this.activatedRoute.data.subscribe((data: { viewConfig: ConfirmAccountViewInterface }) => {
      this.prepareView(data.viewConfig);
    });
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
  createAccount(data: any): void {

  }

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

  private onTokenExpired = () => {
    this.viewConfig = {
      ...this.viewConfig,
      viewType: ConfirmAccountViewType.TYPE_TOKEN_EXPIRED,
    };

    this.isLoading = false;
  };

  private prepareView(config: ConfirmAccountViewInterface): void {
    this.viewConfig = config;

    switch (config.viewType) {
      case ConfirmAccountViewType.TYPE_CONFIRM_REGISTRATION:
      default:
        this.confirmAccount();
    }
  }
}

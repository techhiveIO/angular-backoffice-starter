import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationTokenInterface, ConfirmationTokenType} from '../../../../shared/models/authState.model';
import {User} from '../../../../shared/models/user.model';

@Component({
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss', '../../auth.theme.scss'],
})

export class ConfirmEmailPageComponent implements OnInit {
  isLoading = false;
  allTokenTypes = ConfirmationTokenType;
  token: ConfirmationTokenInterface;
  isTokenExpired = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { token: ConfirmationTokenInterface }) => {
      this.token = data.token;

      this.prepareView(this.token);
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
  createAccount(data: Partial<User>): void {

  }

  /**
   * This function is used to activate accounts that have signed up to the platform on their own. These users do not
   * need to enter any further information.
   */
  private confirmAccount(): void {
    this.isLoading = true;
  }

  private prepareView(token: ConfirmationTokenInterface): void {
    switch (token.type) {
      case ConfirmationTokenType.EXPIRED:
        this.isTokenExpired = true;
        break;
      case ConfirmationTokenType.CONFIRMATION:
        this.confirmAccount();
        break;
      default:
        this.isTokenExpired = false;
    }
  }
}

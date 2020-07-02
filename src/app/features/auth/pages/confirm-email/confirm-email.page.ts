import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationTokenInterface, ConfirmationTokenType} from '../../../../shared/models/authState.model';

@Component({
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss', '../auth.theme.scss'],
})

export class ConfirmEmailPageComponent implements OnInit {

  allTokenTypes = ConfirmationTokenType;
  token: ConfirmationTokenInterface;
  isTokenExpired = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { token: ConfirmationTokenInterface }) => {
      this.token = data.token;
      this.isTokenExpired = false;
    }, error => {
      this.isTokenExpired = true;
      this.token = null;
    });
  }

  onRequestNewEmail(): void {

  }

  /**
   * This function is used for accounts that have been invited by an admin rather than have signed up on their own.
   * These users were invited by email, and still need to input information like their name, mobile, and password.
   */
  createAccount(): void {

  }

  /**
   * This function is used to activate accounts that have signed up to the platform on their own. These users do not
   * need to enter any further information.
   */
  private confirmAccount(): void {

  }
}

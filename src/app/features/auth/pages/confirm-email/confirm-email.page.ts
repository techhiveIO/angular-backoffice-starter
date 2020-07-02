import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationTokenInterface, ConfirmationTokenType} from '../../../../shared/models/authState.model';
import {FormBuilder, FormGroup} from '@angular/forms';
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
  formGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { token: ConfirmationTokenInterface }) => {
      this.token = data.token;
      this.token.type = this.allTokenTypes.INVITATION;
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
  createAccount(data: Partial<User>): void {

  }

  /**
   * This function is used to activate accounts that have signed up to the platform on their own. These users do not
   * need to enter any further information.
   */
  private confirmAccount(): void {

  }
}

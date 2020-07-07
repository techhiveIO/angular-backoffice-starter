import {Component} from '@angular/core';
import {AuthFacade} from '../../../../core/auth/services';
import {User} from '../../../../shared/models/user.model';

@Component({
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss', '../../auth.theme.scss'],
})

export class SignupPageComponent {
  isLoading = false;
  emailSent = false;

  constructor(
    private readonly authFacade: AuthFacade
  ) {
  }

  onSubmit(data: Partial<User>) {
    this.isLoading = true;

    this.authFacade.register(data.firstName, data.lastName, data.email, data.password)
      .subscribe((user: User) => {
          this.isLoading = false;
          this.emailSent = true;
        }
      );
  }
}

import {Component} from '@angular/core';
import {AuthFacade} from '../../../../core/auth/services';
import {User} from '../../../../shared/models/user.model';

@Component({
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss', '../../auth.theme.scss'],
})

export class SignupPageComponent {
  isLoading = false;

  constructor(
    private readonly authFacade: AuthFacade
  ) {
  }

  onSubmit(data: Partial<User>) {
    this.isLoading = true;

    this.authFacade.register(data.firstName, data.lastName, data.email, data.password)
      .subscribe((res) => {
          this.isLoading = false;
          console.log('Response back', res);
        }
      );
  }
}

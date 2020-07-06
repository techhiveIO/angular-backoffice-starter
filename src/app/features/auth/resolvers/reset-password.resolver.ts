import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthFacade} from '../../../core/auth/services';
import {map} from 'rxjs/operators';
import {ResetPasswordViewInterface, ResetPasswordViewType} from '../models/view-types.model';

/**
 * I'm using this service to help me decide which view needs to be displayed when the user accesses the reset password page.
 * The resolver will return a configuration that includes the view type and attemptedEmail or resetToken.
 * We will only return the attemptedEmail if the view is TYPE_NEW_REQUEST; resetToken for TYPE_RESET_TOKEN; neither for TYPE_EMAIL_SENT.
 */
@Injectable()
export class ResetPasswordResolver implements Resolve<ResetPasswordViewInterface> {
  constructor(
    private readonly authFacade: AuthFacade,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ResetPasswordViewInterface> {
    const token = route.params.token;

    return this.authFacade.fetchStoredEmailAttempt()
      .pipe(
        map((attemptedEmail: string) => {
          if (attemptedEmail) {

            return {
              viewType: ResetPasswordViewType.TYPE_NEW_REQUEST,
              attemptedEmail,
            };
          } else if (token) {

            return {
              viewType: ResetPasswordViewType.TYPE_RESET_TOKEN,
              resetToken: token,
            };
          }

          return {
            viewType: ResetPasswordViewType.TYPE_EMAIL_SENT,
          };
        }),
      );
  }
}

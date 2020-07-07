import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ConfirmAccountViewInterface, ConfirmAccountViewType} from '../models/view-types.model';
import {switchMap, take} from 'rxjs/operators';
import {ROUTES_AUTH} from '../../../shared/consts/routes.consts';

@Injectable()
export class ConfirmationTokenResolver implements Resolve<ConfirmAccountViewInterface> {

  /**
   * If the user is trying to complete their registration process, we need to resolve the corresponding config.
   * If the user is trying to accept an invitation into the platform, we also need to resolve the corresponding config.
   * @param route: The activated route snapshot.
   */
  resolve(route: ActivatedRouteSnapshot): Observable<ConfirmAccountViewInterface> {

    return of(route.params.token)
      .pipe(
        take(1),
        switchMap((token: string) => {
          if (route.routeConfig.path.includes(ROUTES_AUTH.ACCEPT_INVITATIONS)) {
            return of({
              viewType: ConfirmAccountViewType.TYPE_ACCEPT_INVITATION,
              token,
            });
          }

          return of({
            viewType: ConfirmAccountViewType.TYPE_CONFIRM_REGISTRATION,
            token,
          });
        })
      );
  }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {AuthFacade} from '../../../core/auth/services';
import {Observable} from 'rxjs';
import {ConfirmationTokenInterface} from '../../../shared/models/authState.model';

@Injectable()
export class ConfirmationTokenResolver implements Resolve<any> {

  constructor(
    private readonly authFacade: AuthFacade,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ConfirmationTokenInterface> {
    return this.authFacade.decodeVerificationToken(route.params.token);
  }
}

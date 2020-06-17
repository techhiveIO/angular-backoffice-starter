import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';
import {AuthFacade} from '../auth/services';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * This Guard prevents authenticated users from entering the /auth routes.
 */
@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanLoad {
  constructor(private readonly authFacade: AuthFacade) {
  }

  public canLoad(): Observable<boolean> {
    return this.authFacade.isAuthenticated().pipe(map((isAuth) => !isAuth));
  }
}

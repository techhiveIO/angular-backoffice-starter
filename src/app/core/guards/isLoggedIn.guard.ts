import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthFacade} from '../auth/services';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * This Guard prevents authenticated users from entering the /auth routes.
 */
@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private readonly authFacade: AuthFacade) {
  }

  public canActivate(): Observable<boolean> {
    return this.authFacade.isAuthenticated().pipe(
      map((isAuth: boolean) => !isAuth),
    );
  }
}

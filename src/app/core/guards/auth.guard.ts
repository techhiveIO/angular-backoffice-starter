import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthFacade} from '../auth/services';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private readonly authFacade: AuthFacade, private readonly router: Router) {
  }

  public canActivate(): Observable<boolean | UrlTree> {
    return this.authFacade.isAuthenticated()
      .pipe(
        map((isAuth: boolean) => isAuth ? true : this.router.parseUrl('/auth')),
      );
  }
}

import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthFacade} from '../facade';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private readonly authFacade: AuthFacade) {
  }

  public canActivate(): Observable<boolean> {
    return this.authFacade.isAuthenticated();
  }
}

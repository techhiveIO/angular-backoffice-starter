import {Injectable} from '@angular/core';
import {AuthApi} from '../api';
import {select, Store} from '@ngrx/store';
import {AuthStateInterface} from '../models/authState.model';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {map, tap} from 'rxjs/operators';
import {actionLogin} from '../store/auth/authActionTypes';
import {selectIsAuthenticated} from '../store/auth/auth.selectors';

@Injectable()
export class AuthFacade {

  constructor(
    private readonly authApi: AuthApi,
    private readonly authStore: Store<AuthStateInterface>
  ) {
  }

  public attemptLogin(email: string, password: string): Observable<User> {
    return this.authApi.login(email, password)
      .pipe(
        tap((authState: AuthStateInterface) => this.authStore.dispatch(actionLogin({payload: authState}))),
        map((authState: AuthStateInterface) => authState.user),
      );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authStore.pipe(select(selectIsAuthenticated));
  }
}

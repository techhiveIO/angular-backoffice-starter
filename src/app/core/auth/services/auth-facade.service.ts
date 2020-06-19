import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {selectIsAuthenticated} from '../store/auth.selectors';
import {actionLogin} from '../store/authActionTypes';
import {AuthApi} from './auth-api.service';
import {AuthStateInterface} from '../../../shared/models/authState.model';
import {User} from '../../../shared/models/user.model';

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

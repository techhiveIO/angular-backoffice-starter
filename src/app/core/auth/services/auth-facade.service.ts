import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {selectAttemptedEmail, selectIsAuthenticated} from '../store/auth.selectors';
import {actionClearEmailAttempt, actionLogin, actionLogout, actionStoreEmailAttempt} from '../store/authActionTypes';
import {AuthApi} from './auth-api.service';
import {AuthStateInterface, ConfirmationTokenInterface} from '../../../shared/models/authState.model';
import {User} from '../../../shared/models/user.model';
import {NotificationsFacade} from '../../services';
import {loginErrorMessage} from '../../../shared/consts/error-messages.consts';

@Injectable()
export class AuthFacade {

  constructor(
    private readonly authApi: AuthApi,
    private readonly notificationsFacade: NotificationsFacade,
    private readonly authStore: Store<AuthStateInterface>
  ) {
  }

  public attemptLogin(email: string, password: string): Observable<User> {
    return this.authApi.login(email, password)
      .pipe(
        tap((authState: Partial<AuthStateInterface>) => this.authStore.dispatch(actionLogin({payload: authState}))),
        map((authState: Partial<AuthStateInterface>) => authState.user),
        catchError(err => {
          this.notificationsFacade.displayErrorMessage(loginErrorMessage);
          return throwError(err);
        })
      );
  }

  public register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.authApi.register(firstName, lastName, email, password)
      .pipe(
        catchError(err => {
          this.notificationsFacade.displayErrorMessage();
          return throwError(err);
        })
      );
  }

  public signOut(): void {
    this.authStore.dispatch(actionLogout({}));
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authStore.pipe(select(selectIsAuthenticated));
  }

  public decodeVerificationToken(token: string): Observable<ConfirmationTokenInterface> {
    return this.authApi.fetchVerificationTokenInfo(token);
  }

  public storeEmailAttempt(attemptedEmail: string): void {
    this.authStore.dispatch(actionStoreEmailAttempt({payload: {attemptedEmail}}));
  }

  public fetchStoredEmailAttempt(): Observable<string> {
    return this.authStore.pipe(select(selectAttemptedEmail));
  }

  public clearEmailAttempt(): void {
    this.authStore.dispatch(actionClearEmailAttempt({}));
  }

  public requestPasswordReset(email: string): Observable<boolean> {
    return this.authApi.requestNewPassword(email);
  }
}

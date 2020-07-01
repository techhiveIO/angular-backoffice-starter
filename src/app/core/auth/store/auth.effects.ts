import {Injectable} from '@angular/core';
import {ofType, createEffect, Effect} from '@ngrx/effects';
import {ActionsSubject} from '@ngrx/store';
import {actionLogin, actionLogout} from './authActionTypes';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LocalStorageFacade} from '../../services';
import {ROUTES_GENERAL} from '../../../app-routing.module';

@Injectable()
export class AuthStoreEffects {
  constructor(
    private actions$: ActionsSubject,
    private readonly localStorageFacade: LocalStorageFacade,
    private readonly router: Router,
  ) {
  }

  @Effect({dispatch: false})
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionLogin),
      tap((action) => {
        this.localStorageFacade.setAuthToken(action.payload.token);
        void this.router.navigate(['/']);
      }),
    ),
    {dispatch: false}
  );

  @Effect({dispatch: false})
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionLogout),
      tap((action) => {
        this.localStorageFacade.clearAuthData();
        void this.router.navigate([ROUTES_GENERAL.AUTH]);
      }),
    ),
    {dispatch: false}
  );
}

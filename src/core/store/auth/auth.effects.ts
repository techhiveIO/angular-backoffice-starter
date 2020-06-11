import {Injectable} from '@angular/core';
import {ofType, createEffect} from '@ngrx/effects';
import {ActionsSubject} from '@ngrx/store';
import {actionLogin} from './auth.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthStoreEffects {
  constructor(
    private actions$: ActionsSubject,
    private readonly localStorageFacade,
    private readonly router: Router,
  ) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionLogin),
      tap((action) => {
        this.localStorageFacade.setAuthToken(action.authState.token);
        void this.router.navigate(['/']);
      }),
    )
  );
}

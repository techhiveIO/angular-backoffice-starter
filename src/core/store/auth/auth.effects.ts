import {Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {ActionsSubject} from '@ngrx/store';
import {actionLogin} from './auth.actions';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthStoreEffects {
  constructor(
    private actions$: ActionsSubject,
    private readonly localStorageFacade,
  ) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionLogin),
      tap((action) => {
        this.localStorageFacade.setAuthToken(action.authState.token);
      }),
    )
  );
}

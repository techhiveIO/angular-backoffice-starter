import {NgModule} from '@angular/core';
import {LocalStorageFacade, NotificationsFacade} from './services';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthApi, AuthFacade} from './auth/services';
import {reducers} from './core.state';
import {AuthStoreEffects} from './auth/store/auth.effects';

const LIBRARY_MODULES = [
  MatSnackBarModule,
];

const SERVICES = [
  AuthApi,
  AuthFacade,
  LocalStorageFacade,
  NotificationsFacade,
];

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AuthStoreEffects]),
    ...LIBRARY_MODULES,
  ],
  exports: [],
  providers: [...SERVICES],
})

export class CoreModule {

}

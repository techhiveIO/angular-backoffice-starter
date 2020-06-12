import {NgModule} from '@angular/core';
import {AuthApi} from './api';
import {AuthFacade, LocalStorageFacade, NotificationsFacade} from './facade';
import {reducers} from './store/core.state';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthStoreEffects} from './store/auth/auth.effects';
import {MatSnackBarModule} from '@angular/material/snack-bar';

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

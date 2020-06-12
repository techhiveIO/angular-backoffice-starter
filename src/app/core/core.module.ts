import {NgModule} from '@angular/core';
import {AuthApi} from './api';
import {AuthFacade, LocalStorageFacade} from './facade';
import {reducers} from './store/core.state';
import {StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {AuthStoreEffects} from './store/auth/auth.effects';

const SERVICES = [
  AuthApi,
  AuthFacade,
  LocalStorageFacade,
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
  ],
  exports: [],
  providers: [...SERVICES],
})

export class CoreModule {

}

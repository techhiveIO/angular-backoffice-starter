import {NgModule} from '@angular/core';
import {AuthApi} from './api';
import {AuthFacade} from './facade';
import {reducers} from './store/core.state';
import {StoreModule} from '@ngrx/store';

const SERVICES = [
  AuthApi,
  AuthFacade,
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
  ],
  exports: [],
  providers: [...SERVICES],
})

export class CoreModule {

}

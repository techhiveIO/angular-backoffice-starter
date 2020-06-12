import {NgModule} from '@angular/core';
import {AuthRoutingModule, routedComponents} from './auth-routing.module';

const COMPONENTS = [...routedComponents];

@NgModule({
  imports: [
    AuthRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})

export class AuthModule {

}

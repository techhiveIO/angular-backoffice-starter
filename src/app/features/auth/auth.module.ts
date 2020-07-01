import {NgModule} from '@angular/core';
import {AuthRoutingModule, routedComponents} from './auth-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from '../../shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ConfirmationTokenResolver} from './resolvers';

const LIBRARY_MODULES = [
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
];

const COMPONENTS = [...routedComponents];

const SERVICES = [ConfirmationTokenResolver];

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    ...LIBRARY_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...SERVICES,
  ],
})

export class AuthModule {

}

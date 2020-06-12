import {NgModule} from '@angular/core';
import {AuthRoutingModule, routedComponents} from './auth-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from '../../shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

const LIBRARY_MODULES = [
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
];

const COMPONENTS = [...routedComponents];

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    ...LIBRARY_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})

export class AuthModule {

}

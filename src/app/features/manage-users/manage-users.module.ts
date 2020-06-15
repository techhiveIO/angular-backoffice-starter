import {NgModule} from '@angular/core';
import {UsersPageComponent} from './pages';

const COMPONENTS = [
  UsersPageComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
})

export class ManageUsersModule {

}

import {NgModule} from '@angular/core';
import {UsersPageComponent} from './pages';
import {UsersListComponent} from './containers';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {UserApiService} from './services/user-api.service';
import {StoreModule} from '@ngrx/store';
import {usersReducer} from './store/users.reducer';

const COMPONENTS = [
  UsersPageComponent,
  UsersListComponent,
];

const SERVICES = [
  UserApiService,
];

const LIBRARY_MODULES = [
  MatTableModule,
  MatSortModule,
  MatButtonModule,
  MatProgressBarModule,
];

@NgModule({
  imports: [
    StoreModule.forFeature('users', usersReducer),
    ...LIBRARY_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...SERVICES,
  ],
})

export class ManageUsersModule {

}

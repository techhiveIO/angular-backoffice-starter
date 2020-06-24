import {NgModule} from '@angular/core';
import {UserDialogComponent, UsersListComponent} from './containers';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {UserApiService} from './services/user-api.service';
import {StoreModule} from '@ngrx/store';
import {usersReducer} from './store/users.reducer';
import {MatPaginatorModule} from '@angular/material/paginator';
import {UserFacadeService} from './services/user-facade.service';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {UsersPageComponent} from './pages';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

const ENTRY_COMPONENTS = [
  UserDialogComponent,
];

const COMPONENTS = [
  UsersListComponent,
  UsersPageComponent,
  ...ENTRY_COMPONENTS,
];

const SERVICES = [
  UserApiService,
  UserFacadeService,
];

const LIBRARY_MODULES = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressBarModule,
];

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature('users', usersReducer),
    ...LIBRARY_MODULES,
    MatFormFieldModule,
    MatInputModule,
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

import {NgModule} from '@angular/core';
import {UsersListComponent} from './containers';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {UserApiService} from './services/user-api.service';
import {StoreModule} from '@ngrx/store';
import {usersReducer} from './store/users.reducer';
import {MatPaginatorModule} from '@angular/material/paginator';
import {UserFacadeService} from './services/user-facade.service';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {UsersPageComponent} from './pages';
import {MatIconModule} from '@angular/material/icon';

const COMPONENTS = [
  UsersListComponent,
  UsersPageComponent,
];

const SERVICES = [
  UserApiService,
  UserFacadeService,
];

const LIBRARY_MODULES = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule,
  MatProgressBarModule,
  MatIconModule,
];

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
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

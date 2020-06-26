import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersPageComponent} from './features/manage-users/pages';
import {AuthGuardService} from './core/guards';
import {IsLoggedInGuard} from './core/guards/isLoggedIn.guard';

export enum ROUTES_GENERAL {
  AUTH = 'auth',
  DASHBOARD = 'dashboard',
  USERS = 'users',
}

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES_GENERAL.USERS,
    pathMatch: 'full',
  },
  {
    path: ROUTES_GENERAL.AUTH,
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [IsLoggedInGuard],
  },
  {
    path: ROUTES_GENERAL.DASHBOARD,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuardService],
  },
  {
    path: ROUTES_GENERAL.USERS,
    component: UsersPageComponent,
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersPageComponent} from './features/manage-users/pages';
import {AuthGuardService} from './core/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'users',
    component: UsersPageComponent,
    canActivate: [],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

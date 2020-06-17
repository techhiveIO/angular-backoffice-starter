import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersPageComponent} from './features/manage-users/pages';
import {AuthGuardService} from './core/guards';
import {IsLoggedInGuard} from './core/guards/isLoggedIn.guard';

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
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'users',
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

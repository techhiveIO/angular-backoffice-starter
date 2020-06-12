import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginPageComponent, SignupPageComponent} from './pages';
import {ResetPasswordPageComponent} from './pages/reset-password/reset-password.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'sign-up',
        component: SignupPageComponent,
      },
      {
        path: 'forgot-password',
        component: ResetPasswordPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AuthRoutingModule {

}

export const routedComponents = [LoginPageComponent, SignupPageComponent, ResetPasswordPageComponent];

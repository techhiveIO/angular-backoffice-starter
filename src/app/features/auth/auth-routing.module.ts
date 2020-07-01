import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthPageComponent, ConfirmEmailPageComponent, LoginPageComponent, SignupPageComponent} from './pages';
import {ResetPasswordPageComponent} from './pages/reset-password/reset-password.page';
import {ConfirmationTokenResolver} from './resolvers';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
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
        path: 'reset-password',
        component: ResetPasswordPageComponent,
      },
      {
        path: 'confirm-email/:token',
        component: ConfirmEmailPageComponent,
        resolve: {
          token: ConfirmationTokenResolver,
        },
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

export const routedComponents = [
  AuthPageComponent,
  LoginPageComponent,
  SignupPageComponent,
  ResetPasswordPageComponent,
  ConfirmEmailPageComponent,
];

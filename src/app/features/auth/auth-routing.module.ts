import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthPageComponent, LoginPageComponent, SignupPageComponent} from './pages';
import {ResetPasswordPageComponent} from './pages/reset-password/reset-password.page';

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

export const routedComponents = [AuthPageComponent, LoginPageComponent, SignupPageComponent, ResetPasswordPageComponent];

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardHomePageComponent} from './pages';

export enum ROUTES_DASHBOARD {
  HOME = 'home',
}

const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: ROUTES_DASHBOARD.HOME,
        pathMatch: 'full',
      },
      {
        path: ROUTES_DASHBOARD.HOME,
        component: DashboardHomePageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
  ],
})

export class DashboardRoutingModule {

}

export const routedComponents = [DashboardHomePageComponent];

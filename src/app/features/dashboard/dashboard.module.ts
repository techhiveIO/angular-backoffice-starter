import {NgModule} from '@angular/core';
import {DashboardRoutingModule, routedComponents} from './dashboard-routing.module';

const COMPONENTS = [
  ...routedComponents,
];

@NgModule({
  imports: [
    DashboardRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})

export class DashboardModule {

}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {CoreModule} from './core/core.module';
import {ManageUsersModule} from './features/manage-users/manage-users.module';
import {MatSidenavModule} from '@angular/material/sidenav';

const LIBRARY_MODULES = [
  MatSidenavModule,
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ManageUsersModule,
    FormsModule,
    ...LIBRARY_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

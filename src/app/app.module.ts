import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {CoreModule} from './core/core.module';
import {ManageUsersModule} from './features/manage-users/manage-users.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SharedModule} from './shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

const LIBRARY_MODULES = [
  MatSidenavModule,
  MatIconModule,
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ManageUsersModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    ...LIBRARY_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

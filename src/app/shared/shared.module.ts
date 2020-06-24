import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ConfirmationDialogComponent, GeneralLayoutComponent} from './components';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {TranslateModule} from '@ngx-translate/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {ClipboardModule} from '@angular/cdk/clipboard';

const LIBRARY_MODULES = [
  MatDialogModule,
  MatButtonModule,
  MatGridListModule,
  MatTooltipModule,
  MatIconModule,
  MatSelectModule,
  ClipboardModule,
];

const ENTRY_COMPONENTS = [ConfirmationDialogComponent];
const COMPONENTS = [...ENTRY_COMPONENTS, GeneralLayoutComponent,];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    ...LIBRARY_MODULES,
  ],
  declarations: [
    ...COMPONENTS
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    ...LIBRARY_MODULES,
    ...COMPONENTS,
  ],
})

export class SharedModule {

}

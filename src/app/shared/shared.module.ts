import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ConfirmationDialogComponent, GeneralLayoutComponent} from './components';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';

const LIBRARY_MODULES = [
  MatDialogModule,
  MatButtonModule,
  MatGridListModule,
];

const ENTRY_COMPONENTS = [ConfirmationDialogComponent];
const COMPONENTS = [...ENTRY_COMPONENTS, GeneralLayoutComponent,];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    ...LIBRARY_MODULES,
    ...COMPONENTS,
  ],
})

export class SharedModule {

}

import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ConfirmationDialogComponent} from './components';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

const LIBRARY_MODULES = [
  MatDialogModule,
  MatButtonModule,
];

const ENTRY_COMPONENTS = [ConfirmationDialogComponent];
const COMPONENTS = [...ENTRY_COMPONENTS];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LIBRARY_MODULES,
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
  ],
})

export class SharedModule {

}

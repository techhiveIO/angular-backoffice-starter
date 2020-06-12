import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

const ENTRY_COMPONENTS = [];
const COMPONENTS = [...ENTRY_COMPONENTS];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
  ],
})

export class SharedModule {

}

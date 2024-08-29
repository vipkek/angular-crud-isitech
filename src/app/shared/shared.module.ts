import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ALL_DIRECTIVES } from './directives';
import { ALL_COMPONENTS } from './components';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ...ALL_COMPONENTS,
    ...ALL_DIRECTIVES,
  ],
  exports: [
    ...ALL_COMPONENTS,
    ...ALL_DIRECTIVES,
  ]
})
export class SharedModule { }

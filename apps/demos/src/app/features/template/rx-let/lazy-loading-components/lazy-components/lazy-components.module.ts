import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponentAComponent } from './lazy-component-a.component';
import { LazyComponentBComponent } from './lazy-component-b.component';

const DECLARATIONS = [
  LazyComponentAComponent,
  LazyComponentBComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule
  ]
})
export class LazyComponentsModule {

}

export const components = DECLARATIONS;

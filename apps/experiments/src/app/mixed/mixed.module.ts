import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as MIXED_ROUTES } from './mixed.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(MIXED_ROUTES)
  ]
})
export class MixedModule {
}

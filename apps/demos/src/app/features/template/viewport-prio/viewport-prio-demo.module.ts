import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './viewport-prio.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ViewportPrioModule {
}

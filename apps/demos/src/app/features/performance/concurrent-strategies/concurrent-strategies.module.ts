import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './concurrent-strategies.routes';

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
  ],
  exports: []
})
export class ConcurrentStrategiesModule {
}

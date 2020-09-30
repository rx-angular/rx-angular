import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './dynamic-counter.routes';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
})
export class DynamicCounterModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-state-in-the-view.routes';
import { RxStateInTheViewComponent } from './rx-state-in-the-view.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

const DECLARATIONS = [RxStateInTheViewComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    CommonModule
  ]
})
export class RxStateInTheViewModule {
}

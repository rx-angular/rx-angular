import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RxStateInTheViewComponent } from './rx-state-in-the-view.component';
import { ROUTES } from './rx-state-in-the-view.routes';

const DECLARATIONS = [RxStateInTheViewComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [SharedModule, RouterModule.forChild(ROUTES), CommonModule],
})
export class RxStateInTheViewModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { ROUTES } from './scheduling.routes';
import { SchedulingComponent } from './scheduling/scheduling.component';

const DECLARATIONS = [SchedulingComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    RxLet,
    RxPush,
    RxUnpatch,
    MatButtonModule,
    VisualizerModule,
  ],
  exports: [DECLARATIONS],
})
export class SchedulingModule {}

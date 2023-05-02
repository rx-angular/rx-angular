import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { ROUTES } from './scheduling.routes';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';

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

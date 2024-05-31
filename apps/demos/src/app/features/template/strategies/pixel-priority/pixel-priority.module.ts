import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PixelPriorityComponent } from './pixel-priority.component';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { ImageArrayModule } from '../../../../shared/image-array/image-array.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SiblingModule } from '../../../../shared/template-structures/sibling/sibling.module';
import { RouterModule } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { CanvasViewModule } from '../../../../shared/canvas-view/canvas-view.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UnpatchEventsModule } from '../../../../rx-angular-pocs/template/directives/unpatch';

@NgModule({
  declarations: [PixelPriorityComponent],
  imports: [
    CommonModule,
    VisualizerModule,
    ImageArrayModule,
    RouterModule.forChild([
      {
        path: '',
        component: PixelPriorityComponent,
      },
    ]),
    MatCheckboxModule,
    SiblingModule,
    RxLet,
    RxPush,
    UnpatchEventsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    CanvasViewModule,
    MatProgressBarModule,
  ],
})
export class PixelPriorityModule {}

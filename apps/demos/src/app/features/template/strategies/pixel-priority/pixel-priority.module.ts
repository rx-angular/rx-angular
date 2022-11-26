import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
import { UnpatchEventsModule } from '../../../../rx-angular-pocs/template/directives/unpatch';
import { CanvasViewModule } from '../../../../shared/canvas-view/canvas-view.module';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { ImageArrayModule } from '../../../../shared/image-array/image-array.module';
import { SiblingModule } from '../../../../shared/template-structures/sibling/sibling.module';
import { PixelPriorityComponent } from './pixel-priority.component';

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
    LetModule,
    PushModule,
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

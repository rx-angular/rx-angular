import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PixelPriorityComponent } from './pixel-priority.component';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { ImageArrayModule } from '../../../../shared/image-array/image-array.module';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { SiblingModule } from '../../../../shared/template-structures/sibling/sibling.module';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { CanvasViewModule } from '../../../../shared/canvas-view/canvas-view.module';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
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

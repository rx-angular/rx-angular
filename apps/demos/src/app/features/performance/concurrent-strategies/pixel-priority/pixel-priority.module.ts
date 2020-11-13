import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PixelPriorityComponent } from './pixel-priority.component';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { ImageArrayModule } from '../../../../shared/image-array/image-array.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SiblingModule } from '../../../../shared/template-structures/sibling/sibling.module';
import { RouterModule } from '@angular/router';
import { TemplateModule } from 'templateAlpha0';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [PixelPriorityComponent],
  imports: [
    CommonModule,
    VisualizerModule,
    ImageArrayModule,
    RouterModule.forChild([{
      path: '',
      component: PixelPriorityComponent
    }]),
    MatCheckboxModule,
    SiblingModule,
    TemplateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule
  ]
})
export class PixelPriorityModule {
}

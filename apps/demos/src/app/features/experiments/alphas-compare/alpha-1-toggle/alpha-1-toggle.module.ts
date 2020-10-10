import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TemplateModule } from 'templateAlpha1';
import { Alpha1ToggleComponent } from './alpha-1-toggle.component';
import { RenderingWorkModule } from '../../../../shared/debug-helper/rendering-work/rendering-work.module';
import { TemplateModule } from '@rx-angular/template';

@NgModule({
  declarations: [Alpha1ToggleComponent],
  imports: [CommonModule, TemplateModule, RenderingWorkModule],
  exports: [Alpha1ToggleComponent],
})
export class Alpha1ToggleModule {}

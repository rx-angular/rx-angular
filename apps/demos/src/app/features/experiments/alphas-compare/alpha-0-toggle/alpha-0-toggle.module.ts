import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateModule } from 'templateAlpha0';
import { Alpha0ToggleComponent } from './alpha-0-toggle.component';
import { RenderingWorkModule } from 'apps/demos/src/app/shared/debug-helper/rendering-work/rendering-work.module';

@NgModule({
  declarations: [Alpha0ToggleComponent],
  imports: [CommonModule, TemplateModule, RenderingWorkModule],
  exports: [Alpha0ToggleComponent],
})
export class Alpha0ToggleModule {}

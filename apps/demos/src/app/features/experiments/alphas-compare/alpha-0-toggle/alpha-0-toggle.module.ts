import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetModule, PushModule } from 'templateAlpha0';
import { Alpha0ToggleComponent } from './alpha-0-toggle.component';
import { RenderingWorkModule } from '../../../../shared/debug-helper/rendering-work/rendering-work.module';

@NgModule({
  declarations: [Alpha0ToggleComponent],
  imports: [CommonModule, LetModule, PushModule, RenderingWorkModule],
  exports: [Alpha0ToggleComponent],
})
export class Alpha0ToggleModule {}

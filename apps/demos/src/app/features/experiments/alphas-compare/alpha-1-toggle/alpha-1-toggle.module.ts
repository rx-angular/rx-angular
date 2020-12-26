import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LetModule, PushModule} from 'templateAlpha1';
import { Alpha1ToggleComponent } from './alpha-1-toggle.component';
import { RenderingWorkModule } from '../../../../shared/debug-helper/rendering-work/rendering-work.module';

@NgModule({
  declarations: [Alpha1ToggleComponent],
  imports: [CommonModule, LetModule, PushModule, RenderingWorkModule],
  exports: [Alpha1ToggleComponent],
})
export class Alpha1ToggleModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CanvasViewComponent } from './canvas-view.component';

@NgModule({
  declarations: [CanvasViewComponent],
  imports: [CommonModule],
  exports: [CanvasViewComponent],
})
export class CanvasViewModule {}

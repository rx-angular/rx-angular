import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasViewComponent } from './canvas-view.component';


@NgModule({
  declarations: [CanvasViewComponent],
  imports: [
    CommonModule
  ],
  exports: [CanvasViewComponent]
})
export class CanvasViewModule { }

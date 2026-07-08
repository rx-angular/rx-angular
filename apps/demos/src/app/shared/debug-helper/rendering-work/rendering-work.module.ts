import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { RenderingWorkComponent } from './rendering-work/rendering-work.component';

@NgModule({
  declarations: [RenderingWorkComponent],
  exports: [RenderingWorkComponent],
  imports: [CommonModule, MatButtonModule, RxUnpatch],
})
export class RenderingWorkModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RenderingWorkComponent } from './rendering-work/rendering-work.component';
import { RxUnpatch } from '@rx-angular/template/unpatch';

@NgModule({
  declarations: [RenderingWorkComponent],
  exports: [RenderingWorkComponent],
  imports: [CommonModule, MatButtonModule, RxUnpatch],
})
export class RenderingWorkModule {}

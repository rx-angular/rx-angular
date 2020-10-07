import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RenderingWorkComponent } from './rendering-work/rendering-work.component';
import { UnpatchEventsModule } from '@rx-angular/template';

@NgModule({
  declarations: [RenderingWorkComponent],
  exports: [RenderingWorkComponent],
  imports: [CommonModule, MatButtonModule, UnpatchEventsModule],
})
export class RenderingWorkModule {}

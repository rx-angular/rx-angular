import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UnpatchEventsModule } from '../../../../../../../libs/template/src/lib/experimental/unpatch/events';
import { RenderingWorkComponent } from './rendering-work/rendering-work.component';



@NgModule({
  declarations: [RenderingWorkComponent],
  exports: [
    RenderingWorkComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    UnpatchEventsModule
  ]
})
export class RenderingWorkModule { }

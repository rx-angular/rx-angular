import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageArrayComponent } from './image-array/image-array.component';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PushModule } from '@rx-angular/template';



@NgModule({
  declarations: [ImageArrayComponent],
  exports: [
    ImageArrayComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatProgressBarModule,
    PushModule
  ]
})
export class ImageArrayModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageArrayComponent } from './controls/image-array.component';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PushModule } from '@rx-angular/template';
import { ColorPrioComponent } from './controls/color-prio.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { LetModule } from '../rx-angular-pocs/let/let.module';



@NgModule({
  declarations: [ImageArrayComponent, ColorPrioComponent],
  exports: [
    ImageArrayComponent, ColorPrioComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatProgressBarModule,
    PushModule,
    MatExpansionModule,
    LetModule
  ]
})
export class ImageArrayModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { ImageArrayComponent } from './controls/image-array.component';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PushModule } from '@rx-angular/template/push';
import { ColorPrioComponent } from './controls/color-prio.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RxLetModule } from '../../rx-angular-pocs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ImageArrayComponent, ColorPrioComponent],
  exports: [ImageArrayComponent, ColorPrioComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatProgressBarModule,
    PushModule,
    MatExpansionModule,
    RxLetModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
  ],
})
export class ImageArrayModule {}

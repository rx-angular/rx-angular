import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RxPush } from '@rx-angular/template/push';
import { RxLetModule } from '../../rx-angular-pocs';
import { ColorPrioComponent } from './controls/color-prio.component';
import { ImageArrayComponent } from './controls/image-array.component';

@NgModule({
  declarations: [ImageArrayComponent, ColorPrioComponent],
  exports: [ImageArrayComponent, ColorPrioComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatProgressBarModule,
    RxPush,
    MatExpansionModule,
    RxLetModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
  ],
})
export class ImageArrayModule {}

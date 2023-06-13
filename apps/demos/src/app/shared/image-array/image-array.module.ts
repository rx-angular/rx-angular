import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { ImageArrayComponent } from './controls/image-array.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { RxPush } from '@rx-angular/template/push';
import { ColorPrioComponent } from './controls/color-prio.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RxLetModule } from '../../rx-angular-pocs';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

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

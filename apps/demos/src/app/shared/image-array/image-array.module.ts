import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { PushModule } from '@rx-angular/template/push';
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
    PushModule,
    MatExpansionModule,
    RxLetModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
  ],
})
export class ImageArrayModule {}

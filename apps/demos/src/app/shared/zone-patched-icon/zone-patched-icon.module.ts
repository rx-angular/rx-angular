import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZonePatchedIconComponent } from './zone-patched-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { RxLet } from '@rx-angular/template/let';

@NgModule({
  declarations: [ZonePatchedIconComponent],
  imports: [CommonModule, MatIconModule, RxLet],
  exports: [ZonePatchedIconComponent],
})
export class ZonePatchedIconModule {}

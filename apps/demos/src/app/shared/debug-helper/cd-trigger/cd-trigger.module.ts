import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';
import { CdTriggerComponent } from './cd-trigger/cd-trigger.component';

@NgModule({
  declarations: [CdTriggerComponent],
  exports: [CdTriggerComponent],
  imports: [CommonModule, MatButtonModule, RxUnpatch, ZonePatchedIconModule],
})
export class CdTriggerModule {}

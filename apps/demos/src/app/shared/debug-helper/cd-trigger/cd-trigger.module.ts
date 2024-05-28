import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdTriggerComponent } from './cd-trigger/cd-trigger.component';
import { MatButtonModule } from '@angular/material/button';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';

@NgModule({
  declarations: [CdTriggerComponent],
  exports: [CdTriggerComponent],
  imports: [CommonModule, MatButtonModule, RxUnpatch, ZonePatchedIconModule],
})
export class CdTriggerModule {}

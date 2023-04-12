import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdTriggerComponent } from './cd-trigger/cd-trigger.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';

@NgModule({
  declarations: [CdTriggerComponent],
  exports: [CdTriggerComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    UnpatchModule,
    ZonePatchedIconModule,
  ],
})
export class CdTriggerModule {}

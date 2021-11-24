import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdTriggerComponent } from './cd-trigger/cd-trigger.component';
import { MatButtonModule } from '@angular/material/button';
import { UnpatchModule } from '@rx-angular/template/experimental/unpatch';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';


@NgModule({
  declarations: [CdTriggerComponent],
  exports: [
    CdTriggerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    UnpatchModule,
    ZonePatchedIconModule
  ]
})
export class CdTriggerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdTriggerComponent } from './cd-trigger/cd-trigger.component';
import { MatButtonModule } from '@angular/material/button';
import { UnpatchEventsModule } from '@rx-angular/template';
import { ZonePatchedIconModule } from '../strategy-control-panel';


@NgModule({
  declarations: [CdTriggerComponent],
  exports: [
    CdTriggerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    UnpatchEventsModule,
    ZonePatchedIconModule
  ]
})
export class CdTriggerModule { }

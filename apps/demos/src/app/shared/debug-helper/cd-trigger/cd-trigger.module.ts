import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdTriggerComponent } from './cd-trigger/cd-trigger.component';
import { MatButtonModule } from '@angular/material/button';
import { UnpatchEventsModule } from '../../../../../../../libs/template/src/lib/experimental/unpatch/events';



@NgModule({
  declarations: [CdTriggerComponent],
  exports: [
    CdTriggerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    UnpatchEventsModule
  ]
})
export class CdTriggerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdTriggerComponent } from './cd-trigger/cd-trigger.component';
import { MatButtonModule } from '@angular/material/button';
import { UnpatchEventsModule } from '@rx-angular/template';


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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { StrategySelectComponent } from './strategy-select/strategy-select.component';

@NgModule({
  declarations: [StrategySelectComponent],
  imports: [
    CommonModule,
    UnpatchEventsModule,
    PushModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [StrategySelectComponent]
})
export class StrategySelectModule {
}

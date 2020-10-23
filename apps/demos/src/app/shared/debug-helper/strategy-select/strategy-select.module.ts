import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushModule } from '@rx-angular/template';
import { StrategySelectComponent } from './strategy-select/strategy-select.component';

@NgModule({
  declarations: [StrategySelectComponent],
  imports: [
    CommonModule,
    PushModule
  ],
  exports: [StrategySelectComponent]
})
export class StrategySelectModule {
}

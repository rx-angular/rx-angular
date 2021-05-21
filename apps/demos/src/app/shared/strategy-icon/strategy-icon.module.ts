import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrategyIconComponent } from './strategy-icons.component';
import { MatIconModule } from '@angular/material/icon';
import { LetModule } from '@rx-angular/template/let';


@NgModule({
  declarations: [StrategyIconComponent],
  imports: [
    CommonModule,
    MatIconModule,
    LetModule
  ],
  exports: [StrategyIconComponent]
})
export class StrategyIconModule {
}

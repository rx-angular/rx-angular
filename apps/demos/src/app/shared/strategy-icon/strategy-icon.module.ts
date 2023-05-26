import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrategyIconComponent } from './strategy-icons.component';
import { MatIconModule } from '@angular/material/icon';
import { RxLet } from '@rx-angular/template/let';

@NgModule({
  declarations: [StrategyIconComponent],
  imports: [CommonModule, MatIconModule, RxLet],
  exports: [StrategyIconComponent],
})
export class StrategyIconModule {}

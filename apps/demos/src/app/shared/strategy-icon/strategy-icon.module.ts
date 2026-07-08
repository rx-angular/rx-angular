import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RxLet } from '@rx-angular/template/let';
import { StrategyIconComponent } from './strategy-icons.component';

@NgModule({
  declarations: [StrategyIconComponent],
  imports: [CommonModule, MatIconModule, RxLet],
  exports: [StrategyIconComponent],
})
export class StrategyIconModule {}

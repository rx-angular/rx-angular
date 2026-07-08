import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ValueDisplayComponent } from './value-display.component';

@NgModule({
  declarations: [ValueDisplayComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ValueDisplayComponent],
})
export class SharedModule {}

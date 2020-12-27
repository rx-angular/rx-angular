import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueDisplayComponent } from './value-display.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ValueDisplayComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ValueDisplayComponent]
})
export class SharedModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from './index';

const DECLARATIONS = [LetDirective];

@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule],
  exports: [DECLARATIONS]
})
export class LetModule {}

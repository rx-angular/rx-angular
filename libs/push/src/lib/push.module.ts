import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushPipe } from './push';
const DECLARATIONS = [PushPipe];
@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule],
  exports: DECLARATIONS
})
export class PushModule {}

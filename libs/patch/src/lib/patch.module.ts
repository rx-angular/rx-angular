import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatchDirective } from './patch/patch.directive';

const DECLARATIONS = [PatchDirective];
@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule],
  exports: DECLARATIONS
})
export class PatchModule {}

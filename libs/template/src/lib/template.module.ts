import { NgModule } from '@angular/core';
import { LetModule } from './let';
import { PushModule } from './push';
import { PatchModule } from './patch';

const MODULES = [LetModule, PushModule, PatchModule];
@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class TemplateModule {}

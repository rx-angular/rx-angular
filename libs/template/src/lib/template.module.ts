import { NgModule } from '@angular/core';
import { LetModule } from './let';
import { PushModule } from './push';

const MODULES = [LetModule, PushModule];
@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class TemplateModule {}

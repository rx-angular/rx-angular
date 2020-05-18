import { NgModule } from '@angular/core';

import { LetModule } from './let';
import { PushModule } from './push';

@NgModule({
  exports: [LetModule, PushModule]
})
export class TemplateModule {}

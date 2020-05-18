import { NgModule } from '@angular/core';

import { LetModule } from './let';
import { PushModule } from './push';
import { UnpatchEventsModule } from './unpatch/events';

@NgModule({
  exports: [LetModule, PushModule, UnpatchEventsModule]
})
export class TemplateModule {}

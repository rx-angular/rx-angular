import { NgModule } from '@angular/core';

import { LetModule } from './let';
import { PushModule } from './push';
import { UnpatchEventsModule } from './experimental/unpatch/events';
import { ViewportPrioModule } from './experimental/viewport-prio';

@NgModule({
  exports: [LetModule, PushModule, UnpatchEventsModule, ViewportPrioModule],
})
export class TemplateModule {}

import { NgModule } from '@angular/core';

import { LetModule } from './let';
import { PushModule } from './push';
import { EventsModule } from './zoneless/events';

@NgModule({
  exports: [LetModule, PushModule, EventsModule]
})
export class TemplateModule {}

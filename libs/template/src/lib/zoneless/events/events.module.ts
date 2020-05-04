import { NgModule } from '@angular/core';
import { EventsDirective } from './events.directive';

const DECLARATIONS = [EventsDirective];
@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS
})
export class EventsModule {}

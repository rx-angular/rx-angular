import { NgModule } from '@angular/core';
import { UnpatchEventsDirective } from './unpatch-events.experimental.directive';

const DECLARATIONS = [UnpatchEventsDirective];
@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class UnpatchEventsModule {}

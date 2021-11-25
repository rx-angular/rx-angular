import { NgModule } from '@angular/core';
import { UnpatchEventsDirective } from './unpatch-events.directive';

const DECLARATIONS = [UnpatchEventsDirective];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS
})
export class UnpatchEventsModule {
}

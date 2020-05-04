import { NgModule } from '@angular/core';
import { ZoneLessDirective } from './zoneless.events.directive';

const DECLARATIONS = [ZoneLessDirective];
@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS
})
export class ZoneLessModule {}

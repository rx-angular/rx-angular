import { NgModule } from '@angular/core';
import { LetDirective } from './let';
import { PushPipe } from './push';
import { PatchDirective } from './patch/patch.directive';

const DECLARATIONS = [LetDirective, PushPipe, PatchDirective];
const EXPORTS = [DECLARATIONS];

@NgModule({
  declarations: [DECLARATIONS],
  exports: [EXPORTS],
})
export class ReactiveComponentModule {}

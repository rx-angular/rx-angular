import { NgModule } from '@angular/core';
import { PushPipe } from './push.pipe';

const DECLARATIONS = [
  PushPipe
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS
})
export class PushModule {
}

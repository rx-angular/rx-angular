import { NgModule } from '@angular/core';
import { PushPipe } from './push.pipe';

const DECLARATIONS = [PushPipe];

@NgModule({
  imports: [...DECLARATIONS],
  exports: DECLARATIONS,
})
export class PushModule {}

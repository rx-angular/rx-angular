import { NgModule } from '@angular/core';
import { PushPipe } from './index';
const DECLARATIONS = [PushPipe];
@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS
})
export class PushModule {}

import { NgModule } from '@angular/core';
import { PipePipe } from './pipe.pipe';

const DECLARATIONS = [
  PipePipe
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS
})
export class PipeModule {
}

import { NgModule } from '@angular/core';
import { MemoPipe } from './memo.pipe';

const DECLARATIONS = [
  MemoPipe
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS
})
export class MemoModule {
}

import { NgModule } from '@angular/core';

import { PushPipe } from './push.pipe';

/** @deprecated use the standalone import, will be removed with v16 */
@NgModule({
  imports: [PushPipe],
  exports: [PushPipe],
})
export class PushModule {}

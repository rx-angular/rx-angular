import { NgModule } from '@angular/core';
import { RxFor } from './for.directive';

const EXPORTS = [RxFor];

/** @deprecated use the standalone import, will be removed with v16 */
@NgModule({
  imports: EXPORTS,
  exports: EXPORTS,
})
export class ForModule {}

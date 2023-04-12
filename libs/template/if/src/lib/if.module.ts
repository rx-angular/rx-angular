import { NgModule } from '@angular/core';
import { RxIf } from './if.directive';

const EXPORTS = [RxIf];

/** @deprecated use the standalone import, will be removed with v16 */
@NgModule({
  imports: EXPORTS,
  exports: EXPORTS,
})
export class IfModule {}

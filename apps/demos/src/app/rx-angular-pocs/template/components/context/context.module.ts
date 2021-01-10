import { NgModule } from '@angular/core';
// @TODO dependency to other tool is something we should avoid
import { RxSwichModule } from '../../directives/switch/rx-swich.module';
import { RxContext } from './rx-context.directive';
import { RxContextContainer } from './rx-context.component';
import { CommonModule } from '@angular/common';

const DECLARATIONS = [
  RxContext, RxContextContainer
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule, RxSwichModule],
  exports: DECLARATIONS,
})
export class RxContextModule {}

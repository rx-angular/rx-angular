import { NgModule } from '@angular/core';
// @TODO dependency to other tool is something we should avoid
import { RxSwichModule } from '../../directives/switch/rx-swich.module';
import { RxContextContainer } from './rx-context.component';
import { RxContext } from './rx-context.directive';

const DECLARATIONS = [RxContext, RxContextContainer];

@NgModule({
  declarations: DECLARATIONS,
  imports: [RxSwichModule],
  exports: DECLARATIONS,
})
export class RxContextModule {}

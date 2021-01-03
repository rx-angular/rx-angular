import { NgModule } from '@angular/core';
import { RxSwichModule } from '../switch/rx-swich.module';
import { RxContext } from './rx-context.directive';
import { RxContextContainer } from './rx-context.component';

const DECLARATIONS = [
  RxContext, RxContextContainer
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [RxSwichModule],
  exports: DECLARATIONS,
})
export class RxContextModule {}

import { NgModule } from '@angular/core';
import { RxSwitch } from './rx-switch.directive';
import { RxSwitchCase } from './rx-switch-case.directive';

@NgModule({
  declarations: [RxSwitch, RxSwitchCase],
  exports: [RxSwitch, RxSwitchCase],
  imports: [],
})
export class RxSwichModule {}

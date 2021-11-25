import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFrameComponent } from './i-frame/i-frame.component';
import { RxLetModule } from '../../../features/experiments/structural-directives/rx-let/rx-let.module';


@NgModule({
  declarations: [IFrameComponent],
  imports: [
    CommonModule,
    RxLetModule
  ],
  exports: [IFrameComponent]
})
export class IFrameModule {
}

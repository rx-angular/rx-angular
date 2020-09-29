import { NgModule } from '@angular/core';
import { RenderingsComponent } from './renderings.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { PushModule } from '../../../../../../../libs/template/src/lib/push';

const DEPRECATIONS = [RenderingsComponent];

@NgModule({
  declarations: [...DEPRECATIONS],
  imports: [
    CommonModule,
    MatRippleModule,
    PushModule
  ],
  exports: [...DEPRECATIONS]
})
export class RenderingsModule {

}

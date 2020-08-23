import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumRenderComponent } from './num-render/num-render.component';
import { MatRippleModule } from '@angular/material/core';


const DEPRECATIONS = [NumRenderComponent];
@NgModule({
  declarations: [...DEPRECATIONS],
  imports: [
    CommonModule,
    MatRippleModule
  ],
  exports: [...DEPRECATIONS]
})
export class DebugHelperModule {

}

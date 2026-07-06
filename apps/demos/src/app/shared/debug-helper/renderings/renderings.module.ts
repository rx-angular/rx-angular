import { NgModule } from '@angular/core';
import { RenderingsComponent } from './renderings.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { RxPush } from '@rx-angular/template/push';

const DECLARATIONS = [RenderingsComponent];

@NgModule({
  imports: [CommonModule, MatRippleModule, RxPush, ...DECLARATIONS],
  exports: [...DECLARATIONS],
})
export class RenderingsModule {}

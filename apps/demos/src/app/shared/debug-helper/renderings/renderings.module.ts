import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RxPush } from '@rx-angular/template/push';
import { RenderingsComponent } from './renderings.component';

const DECLARATIONS = [RenderingsComponent];

@NgModule({
  imports: [CommonModule, MatRippleModule, RxPush, ...DECLARATIONS],
  exports: [...DECLARATIONS],
})
export class RenderingsModule {}

import { NgModule } from '@angular/core';
import { RenderingsComponent } from './renderings.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { PushPipe } from '@rx-angular/template/push';

const DECLARATIONS = [RenderingsComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, MatRippleModule, PushPipe],
  exports: [...DECLARATIONS],
})
export class RenderingsModule {}

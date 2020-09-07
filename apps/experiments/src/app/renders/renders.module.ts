import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumRenderComponent } from './num-render.component';
import { MatRippleModule } from '@angular/material/core';



@NgModule({
  declarations: [NumRenderComponent],
  imports: [
    CommonModule,
    MatRippleModule
  ],
  exports: [NumRenderComponent]
})
export class RendersModule { }

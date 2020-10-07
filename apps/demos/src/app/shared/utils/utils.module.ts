import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToArrayPipe } from './to-array.pipe';


@NgModule({
  declarations: [ToArrayPipe],
  imports: [
    CommonModule
  ],
  exports: [ToArrayPipe]
})
export class UtilsModule { }

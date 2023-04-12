import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RenderingWorkComponent } from './rendering-work/rendering-work.component';
import { UnpatchModule } from '@rx-angular/template/unpatch';

@NgModule({
  declarations: [RenderingWorkComponent],
  exports: [RenderingWorkComponent],
  imports: [CommonModule, MatButtonModule, UnpatchModule],
})
export class RenderingWorkModule {}

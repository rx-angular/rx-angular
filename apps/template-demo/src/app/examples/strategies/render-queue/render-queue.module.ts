import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnpatchEventsModule } from '@rx-angular/template';
import { RenderQueueComponent } from './render-queue/render-queue.component';
import { ChildComponent } from './render-queue/child.component';
import { ROUTES } from './render-queue.routes';
import { DirtyChecksModule } from '../../../debug-helper/dirty-checks/dirty-checks.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RenderQueueComponent, ChildComponent],
  imports: [
    CommonModule,
    UnpatchEventsModule,
    RouterModule.forChild(ROUTES),
    DirtyChecksModule,
    MatButtonModule
  ]
})
export class RenderQueueModule {
}

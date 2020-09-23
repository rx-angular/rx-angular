import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { UnpatchEventsModule } from '@rx-angular/template';
import { RenderQueueComponent } from './render-queue/render-queue.component';
import { ChildComponent } from './render-queue/child.component';
import { SharedModule } from '../../../shared/shared.module';

const ROUTES: Routes = [
  {
    component: RenderQueueComponent,
    path: '',
  },
];

@NgModule({
  declarations: [RenderQueueComponent, ChildComponent],
  imports: [
    CommonModule,
    UnpatchEventsModule,
    RouterModule.forChild(ROUTES),
    MatListModule,
    SharedModule,
  ],
})
export class RenderQueueModule {}

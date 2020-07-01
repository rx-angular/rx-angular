import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UnpatchEventsModule } from '@rx-angular/template';
import { Child2Component } from './render-queue/child2.component';
import { RenderQueueComponent } from './render-queue/render-queue.component';
import { ChildComponent } from './render-queue/child.component';

const ROUTES: Routes = [
  {
    component: RenderQueueComponent,
    path: ''
  }
];

@NgModule({
  declarations: [RenderQueueComponent, ChildComponent, Child2Component],
  imports: [CommonModule, UnpatchEventsModule, RouterModule.forChild(ROUTES)]
})
export class RenderQueueModule {}

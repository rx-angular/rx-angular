import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'scheduling'
      },
      {
        path: 'scheduling',
        loadChildren: () =>
          import('./scheduling/scheduling.module').then(
            m => m.SchedulingModule
          )
      },
      {
        path: 'renderer',
        loadChildren: () =>
          import('./render-queue/render-queue.module').then(
            m => m.RenderQueueModule
          )
      },
      {
        path: 'coalescing',
        loadChildren: () =>
          import('./coalescing/coalescing.module').then(
            m => m.CoalescingModule
          )
      }
    ])
  ]
})
export class RenderingDemoModule { }

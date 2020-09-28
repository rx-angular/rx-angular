import { Routes } from '@angular/router';

export const ROUTES: Routes = [
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
];

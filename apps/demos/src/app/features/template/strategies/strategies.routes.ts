import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'renderer'
  },
  {
    path: 'renderer',
    loadChildren: () =>
      import('./render-queue/render-queue.module').then(
        m => m.RenderQueueModule
      )
  }
];

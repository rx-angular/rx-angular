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
  },
  {
    path: 'virtual-scroll-demo',
    loadChildren: () =>
      import('./virtual-scroll-demo/virtual-scroll-demo.module').then(
        m => m.VirtualScrollDemoModule
      )
  }
];

import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'virtual-scroll-demo'
  },
  {
    path: 'virtual-scroll-demo',
    loadChildren: () =>
      import('./virtual-scroll-demo/virtual-scroll-demo.module').then(
        m => m.VirtualScrollDemoModule
      )
  }
];

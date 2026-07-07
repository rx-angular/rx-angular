import { Routes } from '@angular/router';

export const RX_VIRTUAL_FOR_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'showcase',
    pathMatch: 'full',
  },
  {
    path: 'showcase',
    loadComponent: () =>
      import('./virtual-rendering/virtual-for-demo.component').then(
        (m) => m.VirtualForDemoComponent,
      ),
  },
  {
    path: 'custom-scroll',
    loadComponent: () =>
      import('./virtual-rendering/virtual-for-scrollable-demo.component').then(
        (m) => m.VirtualForCustomScrollableDemoComponent,
      ),
  },
  {
    path: 'window-scrolling',
    loadComponent: () =>
      import('./virtual-rendering/virtual-for-scroll-window-demo.component').then(
        (m) => m.VirtualForScrollWindowDemoComponent,
      ),
  },
  {
    path: 'reverse-infinite-scroll',
    loadComponent: () =>
      import('./virtual-rendering/virtual-for-reverse-infinite-scroll.component').then(
        (m) => m.VirtualForReverseInfiniteScrollComponent,
      ),
  },
  {
    path: 'monkey-test',
    loadComponent: () =>
      import('./virtual-rendering/virtual-for-monkey-test.component').then(
        (m) => m.VirtualForMonkeyTestComponent,
      ),
  },
  {
    path: 'crazy-update',
    loadComponent: () =>
      import('./virtual-rendering/virtual-for-crazy-update.component').then(
        (m) => m.VirtualForCrazyUpdateComponent,
      ),
  },
  {
    path: 'scroll-to',
    loadComponent: () =>
      import('./virtual-rendering/virtual-for-scrollto-demo.component').then(
        (m) => m.VirtualForScrollToDemoComponent,
      ),
  },
];

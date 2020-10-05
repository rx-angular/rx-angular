import { Routes } from '@angular/router';
import { Local01Component } from './local01/local01.component';
import { StrategiesOverviewComponent } from './strategies.overview.component';
import { VirtualScrollDemoComponent } from './virtual-scroll-demo/virtual-scroll-demo.component';

export const STRATEGY_ROUTES: Routes = [
  {
    path: '',
    component: StrategiesOverviewComponent,
  },

  {
    path: 'scheduling',
    loadChildren: () =>
      import('../../experiments/strategies/scheduling/scheduling.module').then(
        m => m.SchedulingModule
      )
  },
  {
    path: 'coalescing',
    loadChildren: () =>
      import('../../experiments/strategies/coalescing/coalescing.module').then(
        m => m.CoalescingModule
      )
  },
  {
    path: 'virtual-scroll',
    component: VirtualScrollDemoComponent,
  },
  {
    path: 'local01',
    component: Local01Component,
  },
];

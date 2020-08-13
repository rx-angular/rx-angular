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
    path: 'virtual-scroll',
    component: VirtualScrollDemoComponent,
  },
  {
    path: 'local01',
    component: Local01Component,
  },
];

import { Routes } from '@angular/router';
import { StrategiesOverviewComponent } from './strategies.overview.component';
import { VirtualScrollDemoComponent } from './virtual-scroll-demo/virtual-scroll-demo.component';

export const STRATEGY_ROUTES: Routes = [
  {
    path: '',
    component: StrategiesOverviewComponent
  },
  {
    path: 'virtual-scroll',
    component: VirtualScrollDemoComponent
  }
]

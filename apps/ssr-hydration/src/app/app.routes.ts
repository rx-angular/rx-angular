import { Routes } from '@angular/router';
import { BasicHydrationDemoComponent } from './demos/basic-demo.component';
import { DeferredContentDemoComponent } from './demos/deferred-content-demo.component';
import { DisabledDemoComponent } from './demos/disabled-demo.component';
import { IfElseSwapDemoComponent } from './demos/if-else-swap-demo.component';
import { SwitchSwapDemoComponent } from './demos/switch-swap-demo.component';

export const routes: Routes = [
  {
    path: '',
    component: BasicHydrationDemoComponent,
  },
  {
    path: 'if-else',
    component: IfElseSwapDemoComponent,
  },
  {
    path: 'switch',
    component: SwitchSwapDemoComponent,
  },
  {
    path: 'deferred',
    component: DeferredContentDemoComponent,
  },
  {
    path: 'disabled',
    component: DisabledDemoComponent,
  },
];

import { Routes } from '@angular/router';
import { VanillaDemoComponent } from './vanilla-demo/vanilla.component';

export const ROUTES: Routes = [
  {
    path: 'ngx-rx-root',
    redirectTo: 'demo-basics'
  },
  {
    path: 'demo-basics',
    loadChildren: () =>
      import('./examples/demo-basics/demo-basics.module').then(
        m => m.DemoBasicsModule
      )
  },
  {
    path: 'rxjs-state',
    component: VanillaDemoComponent
  }
];

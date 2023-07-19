import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'concepts',
    loadChildren: () =>
      import('../features/concepts/fundamentals.module').then(
        (m) => m.FundamentalsModule
      )
  },
  {
    path: 'template',
    loadChildren: () =>
      import('../features/template/template-shell.module').then(
        (m) => m.TemplateShellModule
      )
  },
  {
    path: 'integrations',
    loadChildren: () =>
      import('../features/integrations/integrations-shell.module').then(
        (m) => m.IntegrationsShellModule
      )
  },
  {
    path: 'experiments',
    loadChildren: () =>
      import('../features/experiments/experiments-shell.module').then(
        (m) => m.ExperimentsShellModule
      )
  },
  {
    path: 'performance',
    loadChildren: () =>
      import('../features/performance/performance-shell.module').then(
        (m) => m.PerformanceShellModule
      )
  }
];

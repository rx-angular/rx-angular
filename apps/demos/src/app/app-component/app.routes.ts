import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'fundamentals',
    loadChildren: () =>
      import('../features/fundamentals/fundamentals.module').then(
        (m) => m.FundamentalsModule
      ),
  },
  {
    path: 'template',
    loadChildren: () =>
      import('../features/template/template-shell.module').then(
        (m) => m.TemplateShellModule
      ),
  },
  {
    path: 'tutorials',
    loadChildren: () =>
      import('../features/tutorials/tutorials-shell.module').then(
        (m) => m.TutorialsShellModule
      ),
  },
  {
    path: 'integrations',
    loadChildren: () =>
      import('../features/integrations/integrations-shell.module').then(
        (m) => m.IntegrationsShellModule
      ),
  },
  {
    path: 'experiments',
    loadChildren: () =>
      import('../features/experiments/experiments-shell.module').then(
        (m) => m.ExperimentsShellModule
      ),
  },
];

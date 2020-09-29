import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'template',
    pathMatch: 'full'
  },
  {
    path: 'template',
    loadChildren: () =>
      import('../features/template/template-shell.module').then(
        m => m.TemplateShellModule
      )
  },
  {
    path: 'tutorials',
    loadChildren: () =>
      import('../features/tutorials/tutorials-shell.module').then(
        m => m.TutorialsShellModule
      )
  },
  {
    path: 'showcases',
    loadChildren: () =>
      import('../features/showcases/showcases-shell.module').then(
        m => m.ShowcasesShellModule
      )
  },
  {
    path: 'experiments',
    loadChildren: () =>
      import('../features/experiments/experiments-shell.module').then(
        m => m.ExperimentsShellModule
      )
  }
];

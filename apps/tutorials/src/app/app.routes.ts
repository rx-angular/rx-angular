import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {path: '', redirectTo: '/tutorials', pathMatch: 'full'},
  {
    path: 'tutorials',
    loadChildren: () =>
      import('./features/tutorials/tutorials-shell.module').then(
        (m) => m.TutorialsShellModule
      )
  },
];

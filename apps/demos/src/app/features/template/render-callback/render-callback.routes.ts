import { Routes } from '@angular/router';

export const RENDER_CALLBACK_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./render-callback.component').then(
        (m) => m.RenderCallbackComponent,
      ),
  },
];

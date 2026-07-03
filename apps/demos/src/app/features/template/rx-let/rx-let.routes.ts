import { Routes } from '@angular/router';

export const RX_LET_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'basic',
    pathMatch: 'full',
  },
  {
    path: 'basic',
    loadComponent: () =>
      import('./rx-let-basic.component').then((m) => m.RxLetBasicComponent),
  },
  {
    path: 'scoping',
    loadComponent: () =>
      import('./scoping/rx-let-scoping.component').then(
        (m) => m.RxLetScopingComponent,
      ),
  },
  {
    path: 'error-handling',
    loadComponent: () =>
      import('./error-handling.component').then(
        (m) => m.ErrorHandlingComponent,
      ),
  },
  {
    path: 'exception-handling',
    loadComponent: () =>
      import('./exception-handling/error-handling-parent.component').then(
        (m) => m.ErrorHandlingParentComponent,
      ),
  },
  {
    path: 'http-errors',
    loadComponent: () =>
      import('./http-errors.component').then((m) => m.HttpErrorsComponent),
  },
  {
    path: 'template-bindings',
    loadComponent: () =>
      import('./let-template-binding/let-template-binding.component').then(
        (m) => m.LetTemplateBindingComponent,
      ),
  },
  {
    path: 'template-triggers',
    loadComponent: () =>
      import('./template-triggers/template-triggers.component').then(
        (m) => m.TemplateTriggersComponent,
      ),
  },
  {
    path: 'preloading-images',
    loadComponent: () =>
      import('./preloading-images.component').then(
        (m) => m.PreloadingImagesComponent,
      ),
  },
];

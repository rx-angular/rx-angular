import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'basic',
  },
  {
    path: 'basic',
    loadChildren: () =>
      import('./basic/rx-let-basic.module').then((m) => m.RxLetBasicModule),
  },
  {
    path: 'scoping',
    loadChildren: () =>
      import('./scoping/rx-let-scoping.module').then(
        (m) => m.RxLetScopingModule
      ),
  },
  {
    path: 'error-handling',
    loadChildren: () =>
      import('./error-handling/error-handing.module').then(
        (m) => m.ErrorHandingModule
      ),
  },
  {
    path: 'exception-handling',
    loadChildren: () =>
      import('./exception-handling/rx-let-exception-handling.module').then(
        (m) => m.RxLetExceptionHandlingModule
      ),
  },
  {
    path: 'http-errors',
    loadChildren: () =>
      import('./http-errors/http-error.module').then((m) => m.HttpErrorModule),
  },
  {
    path: 'template-bindings',
    loadChildren: () =>
      import('./let-template-binding/let-template-binding.module').then(
        (m) => m.LetTemplateBindingModule
      ),
  },
  {
    path: 'ng-if-hack',
    loadChildren: () =>
      import('./ng-if-hack/ng-if-hack.module').then((m) => m.NgIfHackModule),
  },
  {
    path: 'preloading-images',
    loadChildren: () =>
      import('./preloading-images/preloading-images.module').then(
        (m) => m.PreloadingImagesModule
      ),
  },
  {
    path: 'lazy-components',
    loadChildren: () =>
      import('./lazy-loading-components/lazy-loading-components.module').then(
        (m) => m.LazyLoadingComponentsModule
      ),
  },
];

import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'coalescing',
    pathMatch: 'full'
  },
  {
    path: 'unpatch',
    loadChildren: () =>
      import('./examples/unpatch/comparison-unpatch.module').then(
        m => m.ComparisonUnpatchModule
      )
  },
  {
    path: 'scheduling',
    loadChildren: () =>
      import('./examples/scheduling/scheduling.module').then(
        m => m.SchedulingModule
      )
  },
  {
    path: 'coalescing',
    loadChildren: () =>
      import('./examples/coalescing/coalescing.module').then(
        m => m.CoalescingModule
      )
  },
  {
    path: 'prioritize-in-viewport',
    loadChildren: () =>
      import(
        './examples/prioritize-in-viewport/prioritize-in-viewport.module'
      ).then(m => m.PrioritizeInViewportModule)
  },
  {
    path: 'tree-prio',
    loadChildren: () =>
      import('./examples/component-tree-prio/component-tree-prio.module').then(
        m => m.ComponentTreePrioModule
      )
  },
  {
    path: 'template-binding',
    loadChildren: () =>
      import('./examples/template-binding/template-binding.module').then(
        m => m.TemplateBindingModule
      )
  }
];

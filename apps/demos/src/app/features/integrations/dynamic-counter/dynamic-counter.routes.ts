export const ROUTES = [
  {
    path: '',
    redirectTo: 'stepone'
  },
  {
    path: 'stepone',
    loadChildren: () =>
      import('./1/dynamic-counter-1.module').then(
        m => m.DynamicCounter1Module
      )
  },
  {
    path: 'solution',
    loadChildren: () =>
      import('./solution/dynamic-counter-solution.module').then(
        m => m.DynamicCounterSolutionModule
      )
  },
];

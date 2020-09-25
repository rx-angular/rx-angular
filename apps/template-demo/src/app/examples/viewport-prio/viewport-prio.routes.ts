export const ROUTES = [
  {
    path: '',
    redirectTo: 'basic-example'
  },
  {
    path: 'basic-example',
    loadChildren: () =>
      import('./basic-example/basic-example.module').then(
        m => m.BasicExampleModule
      )
  }
];

export const ROUTES = [
  {
    path: '',
    redirectTo: 'basic-example'
  },
  {
    path: 'basic-example',
    loadChildren: () =>
      import('./push-basic-example/push-basic-example.module').then(
        m => m.PushBasicExampleModule
      )
  }
];

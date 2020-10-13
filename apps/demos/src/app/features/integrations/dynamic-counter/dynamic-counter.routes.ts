export const ROUTES = [
  {
    path: '',
    redirectTo: 'rx-state-and-reactive-forms'
  },
  {
    path: 'rx-state-and-reactive-forms',
    loadChildren: () =>
      import('./rx-state-and-reactive-forms/rx-state-and-reactive-forms.module').then(
        m => m.RxStateAndReactiveFormsModule)
  },
  {
    path: 'rx-state-as-presenter',
    loadChildren: () =>
      import('./rx-state-as-presenter/rx-state-as-presenter.module').then(
        m => m.RxStateAsPresenterModule)
  },
  {
    path: 'rx-state-in-the-view',
    loadChildren: () =>
      import('./rx-state-in-the-view/rx-state-in-the-view.module').then(
        m => m.RxStateInTheViewModule)
  },
  {
    path: 'rx-state-and-subjects',
    loadChildren: () =>
      import('./rx-state-and-subjects/rx-state-and-subjects.module').then(
        m => m.RxStateAndSubjectsModule)
  },
  {
    path: 'starter',
    loadChildren: () =>
      import('./starter/starter.module').then(
        m => m.StarterModule)
  }
];

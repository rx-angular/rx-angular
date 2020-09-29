import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'cd',
    loadChildren: () => import('./fundamentals/cd/cd.module').then((mod) => mod.CdModule),
    canActivate: [],
    canActivateChild: []
  },
  {
    path: 'mixed',
    loadChildren: () =>
      import('./template/mixed/mixed.module').then((mod) => mod.MixedModule),
    canActivate: [],
    canActivateChild: []
  },
  /*{
    path: '',
    loadChildren: () =>
      import('./fundamentals/irrelevant-to-test/irrelevant-to-test.module').then(
        (mod) => mod.IrrelevantToTestModule
      ),
    canActivate: [],
    canActivateChild: []
  },*/
  {
    path: 'rx-base-state',
    loadChildren: () =>
      import('./state/rx-state.module').then((mod) => mod.RxStateModule),
    canActivate: [],
    canActivateChild: []
  },
  {
    path: 'strategies',
    loadChildren: () =>
      import('./strategies/strategies.module').then((m) => m.StrategiesModule)
  },
  {
    path: 'embedded-view',
    loadChildren: () =>
      import('./template/cd-embedded-view/cd-embedded-view.module').then((m) => m.CdEmbeddedViewModule)
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class ExperimentsShellModule {}

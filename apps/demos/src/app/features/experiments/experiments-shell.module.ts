import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'change-detections',
    loadChildren: () => import('./fundamentals/change-detection/change-detection.module')
      .then((mod) => mod.ChangeDetectionModule),
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
      import('./cd-embedded-view/cd-embedded-view.module').then((m) => m.CdEmbeddedViewModule)
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class ExperimentsShellModule {}

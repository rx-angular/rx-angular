import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'change-detection',
    loadChildren: () => import('./change-detection/change-detection.module')
      .then((mod) => mod.ChangeDetectionModule),
    canActivate: [],
    canActivateChild: []
  },
  {
    path: 'render-callback',
    loadChildren: () => import('./render-callback/render-callback.module')
      .then(m => m.RenderCallbackModule)
  }
  /*{
    path: '',
    loadChildren: () =>
      import('./fundamentals/irrelevant-to-test/irrelevant-to-test.module').then(
        (mod) => mod.IrrelevantToTestModule
      ),
    canActivate: [],
    canActivateChild: []
  },*/
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class FundamentalsModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'rx-let',
    pathMatch: 'full'
  },
  {
    path: 'strategies',
    loadChildren: () =>
      import('./strategies/strategies.module').then(
        m => m.StrategiesDemoModule
      )
  },
  {
    path: 'rx-let',
    loadChildren: () =>
      import('./rx-let/rx-let-demo.module').then(
        m => m.RxLetDemoModule
      )
  },
  {
    path: 'push',
    loadChildren: () =>
      import('./push/push.module').then(
        m => m.PushDemoModule
      )
  },
  {
    path: 'unpatch',
    loadChildren: () =>
      import('./unpatch/unpatch.module').then(
        m => m.UnpatchModule
      )
  },
  {
    path: 'view-port-prio',
    loadChildren: () =>
      import('./viewport-prio/viewport-prio-demo.module').then(
        m => m.ViewportPrioModule
      )
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class TemplateShellModule {}

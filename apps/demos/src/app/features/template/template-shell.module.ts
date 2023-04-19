import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'rx-let',
    pathMatch: 'full',
  },
  {
    path: 'push',
    loadChildren: () =>
      import('./push/push.module').then(
        m => m.PushDemoModule
      )
  },
  {
    path: 'rx-let',
    loadChildren: () =>
      import('./rx-let/rx-let-demo.module').then((m) => m.RxLetDemoModule),
  },
  {
    path: 'rx-chunk',
    loadChildren: () =>
      import('./chunk/rx-chunk-demo.module').then((m) => m.RxChunkDemoModule),
  },
  {
    path: 'rx-if',
    loadChildren: () =>
      import('./rx-if/rx-if-demo.module').then((m) => m.RxIfDemoModule),
  },
  {
    path: 'rx-for',
    loadChildren: () =>
      import('./rx-for/rx-for.module').then((m) => m.RxForDemoModule),
  },
  {
    path: 'pipes',
    loadChildren: () =>
      import('./pipes/pipes.module').then((m) => m.PipesModule),
  },
  {
    path: 'unpatch',
    loadChildren: () =>
      import('./unpatch/unpatch.module').then((m) => m.UnpatchModule),
  },
  {
    path: 'rx-context',
    loadChildren: () =>
      import('./rx-context/rx-context.routed.module').then(
        (m) => m.RxContextRoutedModule
      ),
  },
  {
    path: 'strategies',
    loadChildren: () =>
      import('./strategies/strategies.module').then((m) => m.StrategiesModule),
  },
  {
    path: 'view-port-prio',
    loadChildren: () =>
      import('./viewport-prio/viewport-prio-demo.module').then(
        (m) => m.ViewportPrioModule
      ),
  },
  {
    path: 'render-callback',
    loadChildren: () =>
      import('./render-callback/render-callback.module').then(
        (m) => m.RenderCallbackModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ROUTES)],
})
export class TemplateShellModule {}

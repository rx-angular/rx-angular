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
    loadChildren: () => import('./push/push.routes').then((m) => m.PUSH_ROUTES),
  },
  {
    path: 'rx-let',
    loadChildren: () =>
      import('./rx-let/rx-let.routes').then((m) => m.RX_LET_ROUTES),
  },
  {
    path: 'rx-if',
    loadComponent: () =>
      import('./rx-if/rx-if-basic.component').then((m) => m.RxIfBasicComponent),
  },
  {
    path: 'rx-for',
    loadChildren: () =>
      import('./rx-for/rx-for.routes').then((m) => m.RX_FOR_ROUTES),
  },
  {
    path: 'rx-virtual-for',
    loadChildren: () =>
      import('./rx-virtual-for/rx-virtual-for.routes').then(
        (m) => m.RX_VIRTUAL_FOR_ROUTES,
      ),
  },
  {
    path: 'strategies',
    loadChildren: () =>
      import('./strategies/strategies.routes').then((m) => m.STRATEGIES_ROUTES),
  },
  {
    path: 'virtual-view',
    loadChildren: () =>
      import('./virtual-view/virtual-view.routes').then(
        (m) => m.VIRTUAL_VIEW_ROUTES,
      ),
  },
  {
    path: 'render-callback',
    loadChildren: () =>
      import('./render-callback/render-callback.routes').then(
        (m) => m.RENDER_CALLBACK_ROUTES,
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ROUTES)],
})
export class TemplateShellModule {}

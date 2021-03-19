import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'nested-vs-injected',
    loadChildren: () => import('./nested-vs-injected/nested-vs-injected.module').then(
      m => m.NestedVsInjectedModule
    )
  },
  {
    path: 'projected-views',
    loadChildren: () => import('./projected-views/projected-views.module').then(
      m => m.ProjectedViewsModule
    )
  },
  {
    path: 'passing-values',
    loadChildren: () => import('./passing-values/passing-values.module').then(
      m => m.PassingValuesModule
    )
  },
  {
    path: 'zone-patched-apis',
    loadChildren: () => import('./zone-patched-apis/zone-patched-apis.module').then(
      m => m.ZonePatchedApisModule
    )
  },
  {
    path: 'scheduling',
    loadChildren: () => import('./scheduling/scheduling.module').then(
      m => m.SchedulingModule
    )
  },
  {
    path: 'read-write-read',
    loadChildren: () => import('./read-write-read/read-write-read.module').then(
      m => m.ReadWriteReadModule
    )
  },
  {
    path: 'coalescing',
    loadChildren: () => import('./coalescing/coalescing.module').then(
      m => m.CoalescingModule
    )
  },
  {
    path: 'global-order',
    loadChildren: () => import('./global-order/global-order.module').then(
      m => m.GlobalOrderModule
    )
  },
  {
    path: 'view-vs-embedded-view',
    loadChildren: () =>
      import(
        './view-vs-embedded-view/view-vs-embedded-view.routed.module'
        ).then((m) => m.ViewVsEmbeddedViewRoutedModule),
  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class FundamentalsModule {
}

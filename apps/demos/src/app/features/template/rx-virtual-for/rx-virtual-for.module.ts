import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'virtual-rendering'
  },
  {
    path: 'virtual-rendering',
    loadChildren: () =>
      import('./virtual-rendering/virtual-for-experiments.module').then(
        m => m.RxVirtualForModule
      )
  }
];


@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  declarations: [],
})
export class RxForDemoModule {}

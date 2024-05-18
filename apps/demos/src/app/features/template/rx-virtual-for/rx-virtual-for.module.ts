import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./virtual-rendering/virtual-for-experiments.module').then(
        (m) => m.RxVirtualForModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  declarations: [],
})
export class RxVirtualForDemoModule {}

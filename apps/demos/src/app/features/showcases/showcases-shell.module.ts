import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const SHOWCASES_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dynamic-counter',
    pathMatch: 'full'
  },
  {
    path: 'dynamic-counter',
    loadChildren: () =>
      import('./dynamic-counter/dynamic-counter.module').then(
        m => m.DynamicCounterModule
      )
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(SHOWCASES_ROUTES)
  ]
})
export class ShowcasesShellModule {}

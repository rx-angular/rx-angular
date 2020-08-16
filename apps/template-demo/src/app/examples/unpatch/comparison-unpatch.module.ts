import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComparisonUnpatchComponent } from './comparison/comparison-unpatch.component';
import { UnpatchEventsModule } from '@rx-angular/template';
import { SharedModule } from '../shared/shared.module';

export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: ComparisonUnpatchComponent,
  },
  {
    path: 'comparison',
    component: ComparisonUnpatchComponent,
  },
];
const DECLARATIONS = [ComparisonUnpatchComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    UnpatchEventsModule,
    SharedModule,
  ],
  exports: [DECLARATIONS],
})
export class ComparisonUnpatchModule {}

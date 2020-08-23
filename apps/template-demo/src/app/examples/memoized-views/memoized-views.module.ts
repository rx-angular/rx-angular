import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { MemoizedViewsComponent } from './experiments-profiling/memoized-views.component';
import { TemplateModule } from '@rx-angular/template';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatIconModule } from '@angular/material/icon';

export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: MemoizedViewsComponent
  },
  {
    path: 'memoized-views',
    component: MemoizedViewsComponent
  }
];
const DECLARATIONS = [MemoizedViewsComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TemplateModule,
    NgxSkeletonLoaderModule,
    MatIconModule,
    SharedModule
  ],
  exports: [DECLARATIONS]
})
export class MemoizedViewsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { ROUTES } from './projected-views.routes';
import { ProjectedViewsComponent } from './projected-views.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer/visualizer.module';
import { ContentChildComponent } from './content-child.component';
import { ViewChildComponent } from './view-child.component';
import { RxForModule, RxLetModule } from '../../../rx-angular-pocs';
import { MatButtonModule } from '@angular/material/button';
import { StrategySelectComponent } from '../../../shared/debug-helper/strategy-select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    RxUnpatch,
    MatButtonModule,
    RxLetModule,
    StrategySelectComponent,
    RxForModule,
    ProjectedViewsComponent,
    ContentChildComponent,
    ViewChildComponent,
  ],
})
export class ProjectedViewsModule {}

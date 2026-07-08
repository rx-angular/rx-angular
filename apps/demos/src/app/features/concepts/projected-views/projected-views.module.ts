import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { RxForModule, RxLetModule } from '../../../rx-angular-pocs';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select/strategy-select.module';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer/visualizer.module';
import { ContentChildComponent } from './content-child.component';
import { ProjectedViewsComponent } from './projected-views.component';
import { ROUTES } from './projected-views.routes';
import { ViewChildComponent } from './view-child.component';

@NgModule({
  declarations: [
    ProjectedViewsComponent,
    ContentChildComponent,
    ViewChildComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    RxUnpatch,
    MatButtonModule,
    RxLetModule,
    StrategySelectModule,
    RxForModule,
  ],
})
export class ProjectedViewsModule {}

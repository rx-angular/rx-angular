import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { StrategySelectModule } from '../../../shared/debug-helper/strategy-select/strategy-select.module';
import { ROUTES } from './projected-views.routes';
import { ProjectedViewsComponent } from './projected-views.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer/visualizer.module';
import { ContentChildComponent } from './content-child.component';
import { ViewChildComponent } from './view-child.component';
import { RxForModule, RxLetModule } from '../../../rx-angular-pocs';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
    UnpatchModule,
    MatButtonModule,
    RxLetModule,
    StrategySelectModule,
    RxForModule,
  ],
})
export class ProjectedViewsModule {}

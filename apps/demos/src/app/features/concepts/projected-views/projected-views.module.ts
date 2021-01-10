import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './projected-views.routes';
import { ProjectedViewsComponent } from './projected-views.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer/visualizer.module';
import { ContentChildComponent } from './content-child.component';
import { ViewChildComponent } from './view-child.component';
import { RxLetModule, UnpatchEventsModule } from '../../../rx-angular-pocs';
import { MatButtonModule } from '@angular/material/button';

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
    UnpatchEventsModule,
    MatButtonModule,
    RxLetModule,
  ],
})
export class ProjectedViewsModule {}

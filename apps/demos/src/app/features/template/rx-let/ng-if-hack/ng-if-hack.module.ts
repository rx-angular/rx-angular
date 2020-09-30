import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ROUTES } from './ng-if-hack.routes';
import { NgIfHackComponent } from './ng-if-hack.component';
import { LetModule, UnpatchEventsModule } from '@rx-angular/template';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatIconModule } from '@angular/material/icon';
import { ValueProviderModule } from '../../../../shared/debug-helper/value-provider/value-provider.module';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';

const DECLARATIONS = [
  NgIfHackComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    LetModule,
    UnpatchEventsModule,
    NgxSkeletonLoaderModule,
    MatIconModule,
    ValueProviderModule,
    VisualizerModule
  ]
})
export class NgIfHackModule {

}

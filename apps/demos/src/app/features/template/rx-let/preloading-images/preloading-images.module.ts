import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ROUTES } from './preloading-images.routes';
import { PreloadingImagesComponent } from './preloading-images.component';
import { LetModule, UnpatchEventsModule } from '@rx-angular/template';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatIconModule } from '@angular/material/icon';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { MatButtonModule } from '@angular/material/button';

const DECLARATIONS = [
  PreloadingImagesComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    DirtyChecksModule,
    LetModule,
    UnpatchEventsModule,
    NgxSkeletonLoaderModule,
    MatIconModule,
    ValueProvidersModule,
    VisualizerModule,
    MatButtonModule
  ]
})
export class PreloadingImagesModule {

}

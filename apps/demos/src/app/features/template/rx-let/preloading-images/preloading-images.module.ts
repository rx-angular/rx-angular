import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { PreloadingImagesComponent } from './preloading-images.component';
import { ROUTES } from './preloading-images.routes';

const DECLARATIONS = [PreloadingImagesComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    DirtyChecksModule,
    RxLet,
    RxUnpatch,
    NgxSkeletonLoaderModule,
    MatIconModule,
    ValueProvidersModule,
    VisualizerModule,
    MatButtonModule,
  ],
})
export class PreloadingImagesModule {}

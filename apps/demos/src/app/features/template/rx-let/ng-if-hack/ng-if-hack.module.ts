import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { GhostElementsModule } from '../../../../shared/ghost-elements';
import { NgIfHackComponent } from './ng-if-hack.component';
import { ROUTES } from './ng-if-hack.routes';
import { NgIfHackNgIfAsyncComponent } from './ng-if-hack-async.component';
import { NgIfHackNgIfPushComponent } from './ng-if-hack-push.component';
import { NgIfHackRxLetComponent } from './ng-if-hack-rx-let.component';
import { NgIfHackNgIfStaticComponent } from './ng-if-hack-static.component';

const DECLARATIONS = [
  NgIfHackComponent,
  NgIfHackNgIfAsyncComponent,
  NgIfHackNgIfStaticComponent,
  NgIfHackRxLetComponent,
  NgIfHackNgIfPushComponent,
];

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
    RxPush,
    MatButtonToggleModule,
    GhostElementsModule,
    MatButtonModule,
  ],
})
export class NgIfHackModule {}

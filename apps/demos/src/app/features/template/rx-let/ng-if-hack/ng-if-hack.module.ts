import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ROUTES } from './ng-if-hack.routes';
import { NgIfHackComponent } from './ng-if-hack.component';
import { PushModule } from '@rx-angular/template/push';
import { LetModule } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatIconModule } from '@angular/material/icon';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { NgIfHackNgIfAsyncComponent } from './ng-if-hack-async.component';
import { NgIfHackNgIfStaticComponent } from './ng-if-hack-static.component';
import { NgIfHackRxLetComponent } from './ng-if-hack-rx-let.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgIfHackNgIfPushComponent } from './ng-if-hack-push.component';
import { GhostElementsModule } from '../../../../shared/ghost-elements';
import { MatButtonModule } from '@angular/material/button';

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
    LetModule,
    UnpatchModule,
    NgxSkeletonLoaderModule,
    MatIconModule,
    ValueProvidersModule,
    VisualizerModule,
    PushModule,
    MatButtonToggleModule,
    GhostElementsModule,
    MatButtonModule,
  ],
})
export class NgIfHackModule {}

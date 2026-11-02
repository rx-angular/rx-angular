import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { CdDefaultModule } from '../../../shared/debug-helper/cd-default/cd-default.module';
import { CdOnPushModule } from '../../../shared/debug-helper/cd-on-push/cd-on-push.module';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { DetectChangesInjectedComponent } from './injected/detect-changes.injected.component';
import { CdDefault1Component } from './nested/default-1.component';
import { CdDefault2Component } from './nested/default-2.component';
import { CdDefault3Component } from './nested/default-3.component';
import { CdDefault4Component } from './nested/default-4.component';
import { DetectChangesNestedComponent } from './nested/detect-changes.nested.component';
import { CdOnPush1Component } from './nested/push-1.component';
import { CdOnPush2Component } from './nested/push-2.component';
import { CdOnPush3Component } from './nested/push-3.component';
import { ROUTES } from './nested-vs-injected.routes';
import { NestedVsProjectedComponent } from './nested-vs-projected.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    RxUnpatch,
    CdDefaultModule,
    VisualizerModule,
    CdOnPushModule,
    MatButtonToggleModule,
    CdDefault1Component,
    CdDefault2Component,
    CdDefault3Component,
    CdDefault4Component,
    CdOnPush1Component,
    CdOnPush2Component,
    CdOnPush3Component,
    DetectChangesInjectedComponent,
    DetectChangesNestedComponent,
    NestedVsProjectedComponent,
  ],
})
export class NestedVsInjectedModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { CdDefaultModule } from '../../../shared/debug-helper/cd-default/cd-default.module';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer/visualizer.module';
import { ZonePatchedApisComponent } from './zone-patched-apis.component';
import { ROUTES } from './zone-patched-apis.routes';

@NgModule({
  declarations: [ZonePatchedApisComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    RxUnpatch,
    RxPush,
    VisualizerModule,
    CdDefaultModule,
    ValueProvidersModule,
  ],
})
export class ZonePatchedApisModule {}

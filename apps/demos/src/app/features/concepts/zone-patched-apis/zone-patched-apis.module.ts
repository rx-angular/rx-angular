import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './zone-patched-apis.routes';
import { MatButtonModule } from '@angular/material/button';
import { PushModule } from '@rx-angular/template/push';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { ZonePatchedApisComponent } from './zone-patched-apis.component';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer/visualizer.module';
import { CdDefaultModule } from '../../../shared/debug-helper/cd-default/cd-default.module';
import { ValueProvidersModule } from '../../../shared/debug-helper/value-provider';

@NgModule({
  declarations: [ZonePatchedApisComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    UnpatchModule,
    PushModule,
    VisualizerModule,
    CdDefaultModule,
    ValueProvidersModule,
  ],
})
export class ZonePatchedApisModule {}

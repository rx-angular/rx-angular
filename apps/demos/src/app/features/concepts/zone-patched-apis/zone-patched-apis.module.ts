import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { PushModule } from '@rx-angular/template/push';
import { UnpatchModule } from '@rx-angular/template/unpatch';
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
    UnpatchModule,
    PushModule,
    VisualizerModule,
    CdDefaultModule,
    ValueProvidersModule,
  ],
})
export class ZonePatchedApisModule {}

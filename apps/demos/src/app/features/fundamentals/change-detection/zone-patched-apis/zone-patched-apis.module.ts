import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './zone-patched-apis.routes';
import { MatButtonModule } from '@angular/material/button';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { ZonePatchedApisComponent } from './zone-patched-apis.component';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { CdDefaultModule } from '../../../../shared/debug-helper/cd-default/cd-default.module';
import { ValueProviderModule } from '../../../../shared/debug-helper/value-provider/value-provider.module';


@NgModule({
  declarations: [
    ZonePatchedApisComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    UnpatchEventsModule,
    PushModule,
    VisualizerModule,
    CdDefaultModule,
    ValueProviderModule
  ]
})
export class ZonePatchedApisModule {
}

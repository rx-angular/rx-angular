import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './basic-example.routes';
import { BasicExampleComponent } from './basic-example.component';
import { LetModule, PushModule, UnpatchEventsModule, ViewportPrioModule } from '@rx-angular/template';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { MatButtonModule } from '@angular/material/button';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { RenderingsModule } from '../../../../shared/debug-helper/renderings';

const DECLARATIONS = [BasicExampleComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    ViewportPrioModule,
    UnpatchEventsModule,
    DirtyChecksModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    PushModule,
    LetModule,
    VisualizerModule,
    ValueProvidersModule,
    RenderingsModule,
    ViewportPrioModule
  ],
  exports: [DECLARATIONS]
})
export class BasicExampleModule {
}

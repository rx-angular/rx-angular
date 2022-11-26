import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './basic-example.routes';
import { BasicExampleComponent } from './basic-example.component';
import { PushModule } from '@rx-angular/template/push';
import { LetModule } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { RenderingsModule } from '../../../../shared/debug-helper/renderings';

const DECLARATIONS = [BasicExampleComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    UnpatchModule,
    DirtyChecksModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    PushModule,
    LetModule,
    VisualizerModule,
    ValueProvidersModule,
    RenderingsModule,
    // ViewportPrioModule
  ],
  exports: [DECLARATIONS],
})
export class BasicExampleModule {}

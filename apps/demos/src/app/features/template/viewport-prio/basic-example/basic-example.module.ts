import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { RenderingsModule } from '../../../../shared/debug-helper/renderings';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { BasicExampleComponent } from './basic-example.component';
import { ROUTES } from './basic-example.routes';

const DECLARATIONS = [BasicExampleComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RxUnpatch,
    DirtyChecksModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    RxPush,
    RxLet,
    VisualizerModule,
    ValueProvidersModule,
    RenderingsModule,
    // ViewportPrioModule
  ],
  exports: [DECLARATIONS],
})
export class BasicExampleModule {}

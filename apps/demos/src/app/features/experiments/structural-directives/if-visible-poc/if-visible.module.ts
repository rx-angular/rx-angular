import { NgModule } from '@angular/core';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { IfVisibleComponent } from './if-visible.component';
import { RxLetModule } from '../../../../rx-angular-pocs';
import { RxIf } from '@rx-angular/template/if';

const DECLARATIONS = [IfVisibleComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [VisualizerModule, ValueProvidersModule, RxLetModule, RxIf],
  exports: DECLARATIONS,
  providers: [],
})
export class IfVisibleModule {}

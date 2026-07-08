import { NgModule } from '@angular/core';
import { RxIf } from '@rx-angular/template/if';
import { RxLetModule } from '../../../../rx-angular-pocs';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { IfVisibleComponent } from './if-visible.component';

const DECLARATIONS = [IfVisibleComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [VisualizerModule, ValueProvidersModule, RxLetModule, RxIf],
  exports: DECLARATIONS,
  providers: [],
})
export class IfVisibleModule {}

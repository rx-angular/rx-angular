import { NgModule } from '@angular/core';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';

import { IfVisibleComponent } from './if-visible.component';
import { RxLetModule } from '../../../../rx-angular-pocs';
import { RxIf } from '@rx-angular/template/if';

const DECLARATIONS = [IfVisibleComponent];

@NgModule({
  imports: [VisualizerModule, RxLetModule, RxIf, ...DECLARATIONS],
  exports: DECLARATIONS,
  providers: [],
})
export class IfVisibleModule {}

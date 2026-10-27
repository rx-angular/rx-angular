import { NgModule } from '@angular/core';
import { RxIf } from '@rx-angular/template/if';
import { RxLetModule } from '../../../../rx-angular-pocs';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { IfVisibleComponent } from './if-visible.component';

const DECLARATIONS = [IfVisibleComponent];

@NgModule({
  imports: [VisualizerModule, RxLetModule, RxIf, ...DECLARATIONS],
  exports: DECLARATIONS,
  providers: [],
})
export class IfVisibleModule {}

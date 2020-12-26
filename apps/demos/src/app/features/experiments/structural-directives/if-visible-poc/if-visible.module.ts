import { NgModule } from '@angular/core';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { IfVisibleComponent } from './if-visible.component';
import { LetModule } from '../../../../shared/rx-angular-pocs/let/let.module';
import { IfVisibleDirective } from './if-visible.directive';
import { RxLetPocModule } from '../rx-let-poc/rx-let-poc.module';

const DECLARATIONS = [
  IfVisibleComponent,
  IfVisibleDirective
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    VisualizerModule,
    ValueProvidersModule,
    RxLetPocModule,
    LetModule
  ],
  exports: DECLARATIONS,
  providers: []
})
export class IfVisibleModule {
}

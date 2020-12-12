import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { UnpatchEventsModule } from '@rx-angular/template';
import { MatButtonModule } from '@angular/material/button';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ValueModule } from '../../../../shared/debug-helper/work';
import { RxForContainerComponent } from './parent.component';
import { RxForValueComponent } from './rx-for-value.component';
import { RxForOf } from './rx-for.directive';
import { Poc6Locv2Directive } from './poc6-locv2.directive';
import { Poc6Locv6Directive } from './poc6-locv.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Poc1ForDirective } from './poc1-for.directive';
import { Poc2ForDirective } from './poc2-for.directive';
import { Poc5Locv5 } from './poc5-locv.directive';
import { ViewVsEmbeddedViewModule } from '../view-vs-embedded-view/view-vs-embedded-view.module';
import { LetModule } from '../../../../shared/rx-angular-pocs/let/let.module';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';

const DECLARATIONS = [
  RxForContainerComponent,
  Poc1ForDirective,
  Poc2ForDirective,
  Poc5Locv5,
  Poc6Locv2Directive,
  Poc6Locv6Directive,
  RxForOf,
  RxForValueComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    VisualizerModule,
    UnpatchEventsModule,
    MatButtonModule,
    DirtyChecksModule,
    ValueModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    LetModule,
    ViewVsEmbeddedViewModule,
    StrategySelectModule
  ],
  exports: DECLARATIONS
})
export class RxForPocModule {
}

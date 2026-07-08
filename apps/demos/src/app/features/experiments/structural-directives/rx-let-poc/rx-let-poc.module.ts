import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { RxLetModule } from '../../../../rx-angular-pocs';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { StrategySelectComponent } from '../../../../shared/debug-helper/strategy-select';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { RxLetPocComponent } from './rx-let-poc.component';
import { RxQueryComponent } from './rx-query.component';
import { RxQueryChildrenComponent } from './rx-query-children.component';
import {
  RxQueryContentComponent,
  RxQueryContentTestDirective,
} from './rx-query-content.component';

const DECLARATIONS = [
  RxLetPocComponent,
  RxQueryComponent,
  RxQueryChildrenComponent,
  RxQueryContentComponent,
  RxQueryContentTestDirective,
];

@NgModule({
  imports: [
    RxLetModule,
    VisualizerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule,
    RouterModule,
    MatCardModule,
    DirtyChecksModule,
    StrategySelectComponent,
    ...DECLARATIONS,
  ],
  exports: DECLARATIONS,
  providers: [],
})
export class RxLetPocModule {}

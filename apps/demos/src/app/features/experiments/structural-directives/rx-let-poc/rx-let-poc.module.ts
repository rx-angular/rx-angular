import { NgModule } from '@angular/core';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';

import { RxLetPocComponent } from './rx-let-poc.component';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { RxQueryChildrenComponent } from './rx-query-children.component';
import {
  RxQueryContentComponent,
  RxQueryContentTestDirective,
} from './rx-query-content.component';
import { RxQueryComponent } from './rx-query.component';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { RxLetModule } from '../../../../rx-angular-pocs';
import { StrategySelectComponent } from '../../../../shared/debug-helper/strategy-select';

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

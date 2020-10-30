import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-let-poc.routes';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { DirtyChecksModule } from 'apps/demos/src/app/shared/debug-helper/dirty-checks';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { RenderingsModule } from 'apps/demos/src/app/shared/debug-helper/renderings';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RxLetPocComponent } from './rx-let-poc.component';
import { RxLetModule } from '../../../../shared/let/rx-let.module';

const DECLARATIONS = [
  RxLetPocComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    CommonModule,
    UnpatchEventsModule,
    DirtyChecksModule,
    RenderingsModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    StrategySelectModule,
    ValueProvidersModule,
    MatButtonToggleModule,
    PushModule,
    RxLetModule
  ],
  exports: DECLARATIONS,
  providers: []
})
export class RxLetPocModule {
}

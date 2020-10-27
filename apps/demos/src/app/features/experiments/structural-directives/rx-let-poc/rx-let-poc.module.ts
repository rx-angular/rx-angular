import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxLetPocComponent } from './components/rx-let-poc/rx-let-poc.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-let-poc.routes';
import { LetPocDirective } from './rx-let-poc.directive';
import { LetPocDirectiveNoProvider } from './rx-let-poc.no-provider.directive';
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
import {
  PushModule,
  SchedulingPriority,
  TemplateModule,
  UnpatchEventsModule,
} from '@rx-angular/template';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { DirtyChecksModule } from 'apps/demos/src/app/shared/debug-helper/dirty-checks';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { RenderingsModule } from 'apps/demos/src/app/shared/debug-helper/renderings';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import { StrategyControlCustomComponent } from './components/strategy-control/strategy-control-custom.component';
import { StrategyControlInheritComponent } from './components/strategy-control/strategy-control-inherit.component';
import { StrategyControlDirectiveComponent } from './components/strategy-control/strategy-control-directive.component';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { filter } from 'rxjs/operators';
import { RX_CUSTOM_STRATEGIES } from './custom-strategies-token';
import { RX_DEFAULT_STRATEGY } from './default-strategy-token';

const DECLARATIONS = [
  RxLetPocComponent,
  StrategyControlCustomComponent,
  StrategyControlInheritComponent,
  StrategyControlDirectiveComponent,
  LetPocDirective,
  LetPocDirectiveNoProvider,
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
    // TemplateModule,
    VisualizerModule,
    StrategySelectModule,
    ValueProvidersModule,
    MatButtonToggleModule,
    PushModule,
  ],
  exports: DECLARATIONS,
  providers: [
    {
      provide: RX_CUSTOM_STRATEGIES,
      useValue: {
        name: 'rxLetPocModuleStrategy',
        renderMethod: '',
        priority: SchedulingPriority.animationFrame,
        detach: true,
      },
      multi: true,
    },
    {
      provide: RX_CUSTOM_STRATEGIES,
      useValue: {
        name: 'postTask',
        renderMethod: '',
        priority: SchedulingPriority.animationFrame,
        detach: true,
      },
      multi: true,
    },
    {
      provide: RX_DEFAULT_STRATEGY,
      useValue: 'local',
    },
  ],
})
export class RxLetPocModule {}

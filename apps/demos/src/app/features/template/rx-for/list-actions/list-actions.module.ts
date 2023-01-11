import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { PushModule } from '@rx-angular/template/push';
import { LetModule } from '@rx-angular/template/let';
import { ForModule } from '@rx-angular/template/for';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/value-providers.module';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { RecursiveModule } from '../../../../shared/template-structures/recursive/recursive.module';
import { ListActionsComponent } from './list-actions.component';
import { ROUTES } from './list-actions.routes';
import { IfModule } from '@rx-angular/template/if';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';

const DECLARATIONS = [ListActionsComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    PushModule,
    DirtyChecksModule,
    MatButtonModule,
    UnpatchModule,
    VisualizerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonToggleModule,
    RecursiveModule,
    ValueProvidersModule,
    MatIconModule,
    StrategySelectModule,
    LetModule,
    ForModule,
    IfModule,
  ],
  exports: [DECLARATIONS],
})
export class ListActionsModule {}

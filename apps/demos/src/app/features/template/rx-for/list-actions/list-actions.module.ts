import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { RouterModule } from '@angular/router';
import { PushModule } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { RxFor } from '@rx-angular/template/for';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/value-providers.module';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';
import { RecursiveModule } from '../../../../shared/template-structures/recursive/recursive.module';
import { ListActionsComponent } from './list-actions.component';
import { ROUTES } from './list-actions.routes';
import { RxIf } from '@rx-angular/template/if';
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
    RxLet,
    RxFor,
    RxIf,
  ],
  exports: [DECLARATIONS],
})
export class ListActionsModule {}

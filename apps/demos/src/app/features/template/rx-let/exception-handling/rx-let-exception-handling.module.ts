import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/strategy-select.module';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/value-providers.module';
import { ErrorHandlingChildComponent } from './error-handling-child.component';
import { ErrorHandlingParentComponent } from './error-handling-parent.component';

@NgModule({
  declarations: [ErrorHandlingParentComponent, ErrorHandlingChildComponent],
  imports: [
    CommonModule,
    RxLet,
    RouterModule.forChild([
      {
        path: '',
        component: ErrorHandlingParentComponent,
      },
    ]),
    ValueProvidersModule,
    StrategySelectModule,
  ],
})
export class RxLetExceptionHandlingModule {}

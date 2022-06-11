import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ForModule } from '@rx-angular/template/for';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/strategy-select.module';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/value-providers.module';
import { ErrorHandlingParentComponent } from './error-handling-parent.component';
import { ErrorHandlingChildComponent } from './error-handling-child.component';

@NgModule({
  declarations: [ErrorHandlingParentComponent, ErrorHandlingChildComponent],
  imports: [
    CommonModule,
    ForModule,
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
export class RxForErrorHandlingModule {}

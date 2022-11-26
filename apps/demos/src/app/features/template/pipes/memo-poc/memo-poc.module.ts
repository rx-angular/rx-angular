import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { MemoPocComponent } from './memo-poc.component';
import { ROUTES } from './memo-poc.routes';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FibonacciPipe } from './fibonacci.pipe';
import { MemoModule, PushModule } from '../../../../rx-angular-pocs';
import { FibonacciMemoPipe } from './fibonacciMemo.pipe';

const DECLARATIONS = [MemoPocComponent, FibonacciPipe, FibonacciMemoPipe];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    PushModule,
    DirtyChecksModule,
    MatButtonModule,
    UnpatchModule,
    MatButtonToggleModule,
    MemoModule,
  ],
  exports: [DECLARATIONS],
})
export class MemoPocModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UnpatchEventsModule } from '@rx-angular/template';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { PipePocComponent } from './pipe-poc.component';
import { ROUTES } from './pipe-poc.routes';
import { PipeModule, PushModule,RxLetModule } from '../../../../rx-angular-pocs';

const DECLARATIONS = [PipePocComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    PipeModule,
    DirtyChecksModule,
    MatButtonModule,
    UnpatchEventsModule,
    PushModule,
    RxLetModule
  ],
  exports: [DECLARATIONS]
})
export class PipePocModule {
}

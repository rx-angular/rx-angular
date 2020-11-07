import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { RxPushModule } from '../../../../shared/rx-angular-pocs/push/rx-push.module';
import { PushBasicExampleComponent } from './push-basic-example.component';
import { ROUTES } from './push-basic-example.routes';

const DECLARATIONS = [PushBasicExampleComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    RxPushModule,
    DirtyChecksModule,
    MatButtonModule,
    UnpatchEventsModule
  ],
  exports: [DECLARATIONS]
})
export class PushBasicExampleModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './patched-apis.routes';
import { MatButtonModule } from '@angular/material/button';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { PatchedApisComponent } from './patched-apis.component';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks/dirty-checks.module';


@NgModule({
  declarations: [
    PatchedApisComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    UnpatchEventsModule,
    PushModule
  ]
})
export class PatchedApisModule {
}

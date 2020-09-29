import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './mix-a.routes';
import { MatButtonModule } from '@angular/material/button';
import { DirtyChecksModule } from '../../../../../shared/debug-helper/dirty-checks/dirty-checks.module';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { Mix1ChildComponent } from './mix1-child.component';
import { Mix1ParentComponent } from './mix1-parent.component';

@NgModule({
  declarations: [
    Mix1ChildComponent,
    Mix1ParentComponent
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
export class Mix1Module {
}

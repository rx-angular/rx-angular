import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './mix-b.routes';
import { MatButtonModule } from '@angular/material/button';
import { DirtyChecksModule } from '../../shared/debug-helper/dirty-checks/dirty-checks.module';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { Mix2ChildComponent } from './mix2-child.component';
import { Mix2ParentComponent } from './mix2-parent.component';

@NgModule({
  declarations: [
    Mix2ParentComponent,
    Mix2ChildComponent
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
export class Mix2Module {
}

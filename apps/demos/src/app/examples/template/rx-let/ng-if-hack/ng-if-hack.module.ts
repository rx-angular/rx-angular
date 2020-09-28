import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { ROUTES } from './ng-if-hack.routes';
import { NgIfHackComponent } from './ng-if-hack.component';
import { LetModule, UnpatchEventsModule } from '@rx-angular/template';

const DECLARATIONS = [
  NgIfHackComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    DirtyChecksModule,
    LetModule,
    UnpatchEventsModule
  ]
})
export class NgIfHackModule {

}

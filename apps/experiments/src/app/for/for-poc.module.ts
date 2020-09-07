import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnpatchEventsModule } from '@rx-angular/template';
import { RouterModule } from '@angular/router';
import { RendersModule } from '../renders/renders.module';
import { ForPocBasicParentComponent } from './basic/parent.component';
import { ForPocBasicDirective } from './basic/for.directive';
import { ForPocAdvancedParentComponent } from './advanced/parent.component';
import { ForPocAdvancedDirective } from './advanced/for.directive';
import { ROUTES as CD_ROUTES } from './for-poc.routes';

import { ForPocOverviewComponent } from './for-poc-overview.component';

@NgModule({
  declarations: [
    ForPocBasicDirective,
    ForPocAdvancedDirective,
    ForPocBasicParentComponent,
    ForPocAdvancedParentComponent,
    ForPocOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CD_ROUTES),
    UnpatchEventsModule,
    RendersModule
  ]
})
export class ForPocModule {
}

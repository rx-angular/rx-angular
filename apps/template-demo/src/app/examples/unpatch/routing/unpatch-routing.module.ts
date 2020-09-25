import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnpatchRoutingComponent } from './unpatch-routing.component';
import { ROUTES } from './unpatch-routing.routes';

const DECLARATIONS = [UnpatchRoutingComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [DECLARATIONS]
})
export class UnpatchRoutingModule {
}

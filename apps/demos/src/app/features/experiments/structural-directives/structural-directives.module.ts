import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES as CD_ROUTES } from './structural-directives.routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(CD_ROUTES)],
})
export class StructuralDirectivesModule {}

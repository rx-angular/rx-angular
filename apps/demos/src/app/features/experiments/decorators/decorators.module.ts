import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './decorators.routes';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class DecoratorsModule { }

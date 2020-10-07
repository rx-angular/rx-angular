import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';
import { ROUTES } from './differ.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TemplateModule,
    ScrollingModule
  ]
})
export class DifferModule {
}

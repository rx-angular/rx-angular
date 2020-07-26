import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { TemplateModule, ViewportPrioModule } from '@rx-angular/template';
import { LetTemplateBindingComponent } from './let-template-binding/let-template-binding.component';
import { ToStringPipe } from './let-template-binding/to-string.pipe';

export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: LetTemplateBindingComponent
  }
];
const DECLARATIONS = [LetTemplateBindingComponent, ToStringPipe];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    ViewportPrioModule,
    RouterModule.forChild(ROUTES),
    TemplateModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule
  ],
  exports: [DECLARATIONS]
})
export class TemplateBindingModule {}

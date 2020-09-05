import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { HttpErrorsComponent } from './http-errors/http-errors.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIfHackComponent } from './ng-if-hack/ng-if-hack.component';
import { LetTemplateBindingComponent } from './let-template-binding/let-template-binding.component';
import { LetTemplateBindingSubjectExampleComponent } from './let-template-binding/examples/let-template-binding-subject-example.component';
import { LetTemplateBindingHttpExampleComponent } from './let-template-binding/examples/let-template-binding-http-example.component';
import { ToStringPipe } from './let-template-binding/to-string.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'http-errors'
  },
  {
    path: 'error-handling',
    component: ErrorHandlingComponent
  },
  {
    path: 'http-errors',
    component: HttpErrorsComponent
  },
  {
    path: 'template-bindings',
    component: LetTemplateBindingComponent
  },
  {
    path: 'ng-if-hack',
    component: NgIfHackComponent
  }

];
const DECLARATIONS = [
  HttpErrorsComponent,
  ErrorHandlingComponent,
  LetTemplateBindingComponent,
  ToStringPipe,
  LetTemplateBindingSubjectExampleComponent,
  LetTemplateBindingHttpExampleComponent,
  NgIfHackComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class RxLetDemoModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LetModule, PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { HttpErrorsComponent } from './http-errors/http-errors.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  }
];
const DECLARATIONS = [
  HttpErrorsComponent,
  ErrorHandlingComponent
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
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class RxLetDemoModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TemplateModule } from '@rx-angular/template';
import { CounterDisplayComponent } from './counter-display.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../../../../shared/utils/utils.module';

const DECLARATIONS = [CounterDisplayComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    TemplateModule,
    UtilsModule
  ],
  exports: [
    DECLARATIONS,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    TemplateModule,
    UtilsModule
  ]
})
export class SharedModule {
}

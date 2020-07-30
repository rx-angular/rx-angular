import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrategiesSetupTestComponent } from './strategies-setup-test.component';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { DemoCounterComponent } from './demo-counter/demo-counter.component';

export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: StrategiesSetupTestComponent,
  },
];

@NgModule({
  declarations: [StrategiesSetupTestComponent, DemoCounterComponent],
  imports: [
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,
    TemplateModule.forRoot(),
    RouterModule.forChild(ROUTES),
  ],
  exports: [StrategiesSetupTestComponent, DemoCounterComponent],
})
export class StrategiesSetupModule {}

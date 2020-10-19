import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxLetPocComponent } from './components/rx-let-poc/rx-let-poc.component';
import { DemoCounterComponent } from './components/demo-counter/demo-counter.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-let-poc.routes';
import { LetPocDirective } from './rx-let-poc.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UnpatchEventsModule } from '@rx-angular/template';
import { DirtyChecksModule } from 'apps/demos/src/app/shared/debug-helper/dirty-checks';
import { RenderingsModule } from 'apps/demos/src/app/shared/debug-helper/renderings';

const DECLARATIONS = [RxLetPocComponent, DemoCounterComponent, LetPocDirective];

@NgModule({
  declarations: DECLARATIONS,
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
    MatExpansionModule,
    CommonModule,
    UnpatchEventsModule,
    DirtyChecksModule,
    RenderingsModule,
    RouterModule.forChild(ROUTES),
  ],
  exports: DECLARATIONS,
})
export class RxLetPocModule {}

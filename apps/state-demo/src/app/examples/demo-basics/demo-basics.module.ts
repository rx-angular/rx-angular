import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DemoBasics1ContainerComponent } from './1/demo-basics-1.container.component';
import { DemoBasicsComponent1Start } from './1/demo-basics-1.start.component';
import { DemoBasics2ContainerComponent } from './2/demo-basics-2.container.component';
import { DemoBasicsComponent2Start } from './2/demo-basics-2.start.component';
import { DemoBasics3ContainerComponent } from './3/demo-basics-3.container.component';
import { DemoBasicsComponenteStart } from './3/demo-basics-3.start.component';
import { DemoBasicsContainerComponent } from './solution/demo-basics.container.component';
import { DemoBasicsComponent } from './solution/demo-basics.component';
import { DemoBasicsComponent1Solution } from './1/demo-basics-1.solution.component';
import { DemoBasicsComponent2Solution } from './2/demo-basics-2.solution.component';

export const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: DemoBasicsContainerComponent,
  },
  {
    path: 'step-1',
    component: DemoBasics1ContainerComponent,
  },
  {
    path: 'step-2',
    component: DemoBasics2ContainerComponent,
  },
  {
    path: 'solution',
    component: DemoBasicsContainerComponent,
  },
];
const DECLARATIONS = [
  DemoBasicsContainerComponent,
  DemoBasicsComponent,

  DemoBasics1ContainerComponent,
  DemoBasicsComponent1Start,
  DemoBasicsComponent1Solution,
  DemoBasics2ContainerComponent,
  DemoBasicsComponent2Start,
  DemoBasicsComponent2Solution,
  DemoBasics3ContainerComponent,
  DemoBasicsComponenteStart,
];
export const materialModules = [
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatExpansionModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatInputModule,
  MatFormFieldModule,
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [CommonModule, materialModules, RouterModule.forChild(ROUTES)],
  exports: [DECLARATIONS],
})
export class DemoBasicsModule {}

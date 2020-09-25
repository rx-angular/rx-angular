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
import { SetupContainerComponent } from './1-setup/setup-container.component';
import { InputBindingsContainerComponent } from './2-input-bindings/input-bindings-container.component';
import { OutputBindingsContainerComponent } from './3-output-bindings/output-bindings-container.component';
import { PresenterPatternContainerComponent } from './5-presenter-pattern/presenter-pattern.container.component';
import { DemoBasicsContainerComponent } from './solution/demo-basics.container.component';
import { SideEffectsContainerComponent } from './4-side-effects/side-effects-container.component';
import { InputBindingsSolution } from './2-input-bindings/input-bindings.solution.component';
import { InputBindingsStart } from './2-input-bindings/input-bindings.start.component';
import { OutputBindingsStart } from './3-output-bindings/output-bindings.start.component';
import { OutputBindingsSolution } from './3-output-bindings/output-bindings.solution.component';
import { SideEffectsStart } from './4-side-effects/side-effects.start.component';
import { SideEffectsSolution } from './4-side-effects/side-effects.solution.component';
import { PresenterPatternStart } from './5-presenter-pattern/presenter-pattern.start.component';
import { SetupStart } from './1-setup/setup-reactive-component-state.start.component';
import { SetupSolution } from './1-setup/setup-reactive-component-state.solution.component';
import { DemoBasicsComponent } from './solution/demo-basics.component';

export const ROUTES = [
  {
    path: '',
    component: SetupContainerComponent
  },
  {
    path: 'setup',
    component: SetupContainerComponent
  },
  {
    path: 'input-bindings',
    component: InputBindingsContainerComponent
  },
  {
    path: 'output-bindings',
    component: OutputBindingsContainerComponent
  },
  {
    path: 'side-effects',
    component: SideEffectsContainerComponent
  },
  {
    path: 'presenter-pattern',
    component: PresenterPatternContainerComponent
  },
  {
    path: 'solution',
    component: DemoBasicsContainerComponent
  }
];
const DECLARATIONS = [
  SetupContainerComponent,
  SetupStart,
  SetupSolution,
  InputBindingsContainerComponent,
  InputBindingsStart,
  InputBindingsSolution,
  OutputBindingsContainerComponent,
  OutputBindingsStart,
  OutputBindingsSolution,
  SideEffectsContainerComponent,
  SideEffectsStart,
  SideEffectsSolution,
  PresenterPatternContainerComponent,
  PresenterPatternStart,
  DemoBasicsContainerComponent,
  DemoBasicsComponent
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
  MatFormFieldModule
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [CommonModule, materialModules, RouterModule.forChild(ROUTES)],
  exports: [DECLARATIONS]
})
export class DemoBasicsModule {
}

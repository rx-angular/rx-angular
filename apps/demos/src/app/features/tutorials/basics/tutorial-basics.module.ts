import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { RouterModule } from '@angular/router';
import { SetupContainerComponent } from './1-setup/setup-container.component';
import { SetupSolution } from './1-setup/setup.solution.component';
import { SetupStart } from './1-setup/setup.start.component';
import { InputBindingsContainerComponent } from './2-input-bindings/input-bindings-container.component';
import { InputBindingsSolution } from './2-input-bindings/input-bindings.solution.component';
import { InputBindingsStart } from './2-input-bindings/input-bindings.start.component';
import { OutputBindingsContainerComponent } from './3-output-bindings/output-bindings-container.component';
import { OutputBindingsSolution } from './3-output-bindings/output-bindings.solution.component';
import { OutputBindingsStart } from './3-output-bindings/output-bindings.start.component';
import { GlobalStateContainerComponent } from './4-global-state/global-state-container.component';
import { GlobalStateSolution } from './4-global-state/global-state.solution.component';
import { GlobalStateStart } from './4-global-state/global-state.start.component';
import { SideEffectsContainerComponent } from './5-side-effects/side-effects-container.component';
import { SideEffectsSolution } from './5-side-effects/side-effects.solution.component';
import { SideEffectsStart } from './5-side-effects/side-effects.start.component';
import { PresenterPatternContainerComponent } from './6-presenter-pattern/presenter-pattern.container.component';
import { PresenterPatternSolution } from './6-presenter-pattern/presenter-pattern.solutuion.component';
import { PresenterPatternStart } from './6-presenter-pattern/presenter-pattern.start.component';
import { DemoBasicsComponent } from './solution/demo-basics.component';
import { DemoBasicsContainerComponent } from './solution/demo-basics.container.component';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'setup',
  },
  {
    path: 'setup',
    component: SetupContainerComponent,
  },
  {
    path: 'input-bindings',
    component: InputBindingsContainerComponent,
  },
  {
    path: 'output-bindings',
    component: OutputBindingsContainerComponent,
  },
  {
    path: 'global-state',
    component: GlobalStateContainerComponent,
  },
  {
    path: 'side-effects',
    component: SideEffectsContainerComponent,
  },
  {
    path: 'presenter-pattern',
    component: PresenterPatternContainerComponent,
  },
  {
    path: 'solution',
    component: DemoBasicsContainerComponent,
  },
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
  GlobalStateContainerComponent,
  GlobalStateStart,
  GlobalStateSolution,
  SideEffectsContainerComponent,
  SideEffectsStart,
  SideEffectsSolution,
  PresenterPatternContainerComponent,
  PresenterPatternStart,
  PresenterPatternSolution,
  DemoBasicsContainerComponent,
  DemoBasicsComponent,
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
export class TutorialBasicsModule {}

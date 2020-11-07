import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-swicht-poc.routes';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { LetModule, PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { MatButtonModule } from '@angular/material/button';
import { RxSwitchPocComponent } from './rx-switch-poc.component';
import { RxSwitch } from './rx-switch.directive';
import { RxSwitchCase } from './rx-switch-case.directive';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ViewVsEmbeddedViewModule } from '../view-vs-embedded-view/view-vs-embedded-view.module';
import { MatInputModule } from '@angular/material/input';
import { IfModule } from '../../../../shared/rx-angular-pocs/If/if.module';

@NgModule({
  declarations: [
    RxSwitch,
    RxSwitchCase,
    RxSwitchPocComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    UnpatchEventsModule,
    MatButtonModule,
    DirtyChecksModule,
    PushModule,
    LetModule,
    MatFormFieldModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatInputModule,
    ViewVsEmbeddedViewModule,
    IfModule
  ]
})
export class RxSwichPocModule {
}

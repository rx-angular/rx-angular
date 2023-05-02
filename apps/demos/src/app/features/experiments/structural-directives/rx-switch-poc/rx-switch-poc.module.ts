import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-switch-poc.routes';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RxSwitchPocComponent } from './rx-switch-poc.component';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { RxSwichModule } from '../../../../rx-angular-pocs/';
import { RxIf } from '@rx-angular/template/if';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';

@NgModule({
  declarations: [RxSwitchPocComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    UnpatchModule,
    MatButtonModule,
    DirtyChecksModule,
    RxPush,
    RxLet,
    MatFormFieldModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatInputModule,
    RxIf,
    RxSwichModule,
    ValueProvidersModule,
  ],
})
export class RxSwitchPocModule {}

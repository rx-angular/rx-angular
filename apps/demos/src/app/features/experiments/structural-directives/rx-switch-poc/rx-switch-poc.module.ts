import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './rx-switch-poc.routes';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { MatButtonModule } from '@angular/material/button';
import { RxSwitchPocComponent } from './rx-switch-poc.component';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { RxSwichModule } from '../../../../rx-angular-pocs/';
import { RxIf } from '@rx-angular/template/if';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider';

@NgModule({
  declarations: [RxSwitchPocComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    VisualizerModule,
    RxUnpatch,
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

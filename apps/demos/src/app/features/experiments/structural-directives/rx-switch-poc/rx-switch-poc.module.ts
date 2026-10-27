import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { RxIf } from '@rx-angular/template/if';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { RxSwitchPocComponent } from './rx-switch-poc.component';
import { ROUTES } from './rx-switch-poc.routes';

@NgModule({
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
    RxSwitchPocComponent,
  ],
})
export class RxSwitchPocModule {}

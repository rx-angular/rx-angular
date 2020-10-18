import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderingWorkModule } from '../../../shared/debug-helper/rendering-work/rendering-work.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AlphasCompareComponent } from './alphas-compare.component';
import { ROUTES as ALPHAS_COMPARE_ROUTES } from './alphas-compare.routes';
import { Alpha0ToggleModule } from './alpha-0-toggle/alpha-0-toggle.module';
import { Alpha1ToggleModule } from './alpha-1-toggle/alpha-1-toggle.module';
import { UnpatchEventsModule } from 'templateAlpha1';

@NgModule({
  declarations: [AlphasCompareComponent],
  imports: [
    CommonModule,
    RenderingWorkModule,
    MatButtonModule,
    RouterModule.forChild(ALPHAS_COMPARE_ROUTES),
    Alpha0ToggleModule,
    Alpha1ToggleModule,
    UnpatchEventsModule
  ]
})
export class AlphasCompareModule {}

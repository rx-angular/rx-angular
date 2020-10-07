import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';
import { ROUTES } from './rx-iterable-differ.routes';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { MatButtonModule } from '@angular/material/button';
import { RxIterableDifferComponent } from './rx-iterable-differ/rx-iterable-differ.component';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer/visualizer.module';

const DECLARATIONS = [RxIterableDifferComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TemplateModule,
    DirtyChecksModule,
    MatButtonModule,
    VisualizerModule
  ]
})
export class RxIterableDifferModule {
}

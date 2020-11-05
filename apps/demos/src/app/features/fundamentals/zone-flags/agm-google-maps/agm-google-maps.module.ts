import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { AgmGoogleMapsComponent } from './agm-google-maps.component';

const DECLARATIONS = [
  AgmGoogleMapsComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    VisualizerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAI8C380tX89ecSgk-QlyKysjo03nUBQi4'
    })
  ],
  exports: [DECLARATIONS]
})
export class AgmGoogleMapsModule {
}

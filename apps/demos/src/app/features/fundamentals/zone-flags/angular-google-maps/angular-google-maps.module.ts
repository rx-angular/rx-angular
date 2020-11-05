import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularGoogleMapsComponent } from './angular-google-maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';


const DECLARATIONS = [
  AngularGoogleMapsComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    VisualizerModule,
    GoogleMapsModule
  ],
  exports: [DECLARATIONS]
})
export class AngularGoogleMapsModule {
}

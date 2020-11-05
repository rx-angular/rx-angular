import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ROUTES } from './zone-flags.routes';
import { AgmGoogleMapsModule } from './agm-google-maps/agm-google-maps.module';
import { AngularGoogleMapsModule } from './angular-google-maps/angular-google-maps.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AgmGoogleMapsModule,
    AngularGoogleMapsModule
  ],
  exports: []
})
export class ZoneFlagsModule {
}

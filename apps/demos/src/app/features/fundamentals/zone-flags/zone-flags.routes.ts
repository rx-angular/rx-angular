import { AgmGoogleMapsComponent } from './agm-google-maps/agm-google-maps.component';
import { AngularGoogleMapsComponent } from './angular-google-maps/angular-google-maps.component';

export const ROUTES = [
  {
    path: '',
    component: AgmGoogleMapsComponent
  },
  {
    path: 'angular-maps',
    component: AngularGoogleMapsComponent
  },
  {
    path: 'agm-maps',
    component: AgmGoogleMapsComponent
  }
];

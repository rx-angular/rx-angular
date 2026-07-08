import { ApplicationConfig } from '@angular/core';
import {
  provideClientHydration,
  withNoIncrementalHydration,
} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(withNoIncrementalHydration())],
};

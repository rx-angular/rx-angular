import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const compilerOptions = environment.zoneless ? {ngZone: "noop"} as any : undefined;
platformBrowserDynamic()
  .bootstrapModule(AppModule, compilerOptions)
  .catch((err) => console.error(err));

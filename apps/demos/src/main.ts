import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { promiseMarkerFactory } from './app/shared/utils/measure';

// if (environment.production) {
  enableProdMode();
// }

const compilerOptions = environment.zoneless
  ? ({ ngZone: 'noop' } as any)
  : undefined;
const mP = promiseMarkerFactory('Bootstrap');
mP.wrap(
  platformBrowserDynamic().bootstrapModule(AppModule)
).catch((err) => console.error(err));

import('./empty-bundle').then(m => m);
import('@rx-angular/template/unpatch').then(m => m.UnpatchModule);
import('@rx-angular/template/let').then(m => m.LetModule);
import('@rx-angular/template/push').then(m => m.PushModule);

import('@rx-angular/cdk/coalescing').then(m => m);
import('@rx-angular/cdk/coercing').then(m => m);
import('@rx-angular/cdk/notifications').then(m => m);
import('@rx-angular/cdk/render-strategies').then(m => m);
import('@rx-angular/cdk/template').then(m => m);
import('@rx-angular/cdk/template').then(m => m);
import('@rx-angular/cdk/zone-less').then(m => m);
import('@rx-angular/cdk/zone-configurations').then(m => m.zoneConfig);

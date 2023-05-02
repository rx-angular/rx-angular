import { NgModule } from '@angular/core';
import { TriggerProviderComponent } from './trigger-provider.component';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RxPush } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TriggerProviderComponent],
  imports: [
    ZonePatchedIconModule,
    MatButtonModule,
    RxLet,
    RxPush,
    UnpatchModule,
    MatIconModule,
  ],
  exports: [TriggerProviderComponent],
})
export class TriggerProviderModule {}

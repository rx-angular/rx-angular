import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';
import { TriggerProviderComponent } from './trigger-provider.component';

@NgModule({
  declarations: [TriggerProviderComponent],
  imports: [
    ZonePatchedIconModule,
    MatButtonModule,
    LetModule,
    PushModule,
    UnpatchModule,
    MatIconModule,
  ],
  exports: [TriggerProviderComponent],
})
export class TriggerProviderModule {}

import { NgModule } from '@angular/core';
import { TriggerProviderComponent } from './trigger-provider.component';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';
import { MatButtonModule } from '@angular/material/button';
import { PushModule } from '@rx-angular/template/push';
import { LetModule } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { MatIconModule } from '@angular/material/icon';

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

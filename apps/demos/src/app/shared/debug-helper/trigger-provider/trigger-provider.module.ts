import { NgModule } from '@angular/core';
import { TriggerProviderComponent } from './trigger-provider.component';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';
import { MatButtonModule } from '@angular/material/button';
import { PushModule, UnpatchEventsModule } from '@rx-angular/template';
import { LetModule } from '@rx-angular/template/let';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TriggerProviderComponent],
  imports: [
    ZonePatchedIconModule,
    MatButtonModule,
    LetModule,
    PushModule,
    UnpatchEventsModule,
    MatIconModule,
  ],
  exports: [TriggerProviderComponent],
})
export class TriggerProviderModule {}

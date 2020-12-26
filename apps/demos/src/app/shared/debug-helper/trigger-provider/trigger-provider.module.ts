import { NgModule } from '@angular/core';
import { TriggerProviderComponent } from './trigger-provider.component';
import { ZonePatchedIconModule } from '../../zone-patched-icon/zone-patched-icon.module';
import { MatButtonModule } from '@angular/material/button';
import { TemplateModule } from '@rx-angular/template';

@NgModule({
  declarations: [TriggerProviderComponent],
  imports: [
    ZonePatchedIconModule,
    MatButtonModule,
    TemplateModule
  ],
  exports: [TriggerProviderComponent]
})
export class TriggerProviderModule {

}

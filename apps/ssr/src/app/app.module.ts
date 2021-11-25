import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { LetModule } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    PushModule,
    LetModule,
    UnpatchModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

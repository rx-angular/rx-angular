import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';
import { LetModule } from '@rx-angular/template/let';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    PushModule,
    LetModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

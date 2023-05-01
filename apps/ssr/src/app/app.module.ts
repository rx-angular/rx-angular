import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PushModule } from '@rx-angular/template/push';
import { ForModule } from '@rx-angular/template/for';
import { RxLet } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    PushModule,
    RxLet,
    UnpatchModule,
    ForModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

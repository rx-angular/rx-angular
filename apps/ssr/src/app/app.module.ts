import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RxPush } from '@rx-angular/template/push';
import { RxFor } from '@rx-angular/template/for';
import { RxLet } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RxPush,
    RxLet,
    UnpatchModule,
    RxFor,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

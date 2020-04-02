import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VanillaDemoComponent } from './vanilla-demo/vanilla.component';
import { NgDemoComponent } from './ng-demo/ng.component';

@NgModule({
  declarations: [AppComponent, VanillaDemoComponent, NgDemoComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VanillaExampleComponent } from './vanilla-demo/vanilla.component';

@NgModule({
  declarations: [AppComponent, VanillaExampleComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

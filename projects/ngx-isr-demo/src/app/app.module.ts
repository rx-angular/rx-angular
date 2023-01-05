import { routes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, TitleStrategy } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppComponent } from './app.component';
import { CustomTitleStrategy } from './custom-title-strategy';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    HttpClientModule,
  ],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

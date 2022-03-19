import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DetailsComponent } from './details.component';
import { PageOneComponent } from './page-one.component';
import { PageThreeComponent } from './page-three.component';
import { PageTwoComponent } from './page-two.component';

const routes: Routes = [
  {
    path: "one",
    component: PageOneComponent,
  },
  {
    path: "two",
    component: PageTwoComponent,
    data: { revalidate: 5 },
  },
  {
    path: "three",
    component: PageThreeComponent,
    data: { revalidate: 0 },
  },
  {
    path: "details/:id",
    component: DetailsComponent,
    data: { revalidate: 10 },
  },
]

@NgModule({
  declarations: [
    AppComponent,
    PageOneComponent,
    PageTwoComponent,
    PageThreeComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

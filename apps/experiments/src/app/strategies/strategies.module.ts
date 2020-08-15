import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';
import { Local01Component } from './local01/local01.component';
import { StrategiesOverviewComponent } from './strategies.overview.component';
import { STRATEGY_ROUTES } from './strategies.routes';
import { ScrollItemComponent } from './virtual-scroll-demo/scroll-item.component';
import { VirtualScrollDemoComponent } from './virtual-scroll-demo/virtual-scroll-demo.component';

@NgModule({
  declarations: [
    VirtualScrollDemoComponent,
    StrategiesOverviewComponent,
    Local01Component,
    ScrollItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(STRATEGY_ROUTES),
    TemplateModule,
    ScrollingModule,
  ],
})
export class StrategiesModule {}

import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngx-rx/ngrx-component-experiments';
import { STRATEGY_ROUTES } from './strategies.routes';
import { VirtualScrollDemoComponent } from './virtual-scroll-demo/virtual-scroll-demo.component';
import { StrategiesOverviewComponent } from './strategies.overview.component';
import { ScrollItemComponent } from './virtual-scroll-demo/scroll-item.component';



@NgModule({
  declarations: [
    VirtualScrollDemoComponent,
    StrategiesOverviewComponent,
    ScrollItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(STRATEGY_ROUTES),
    ReactiveComponentModule,
    ScrollingModule
  ]
})
export class StrategiesModule { }

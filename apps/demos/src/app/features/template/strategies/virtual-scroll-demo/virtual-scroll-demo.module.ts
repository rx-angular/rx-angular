import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualScrollDemoComponent } from './virtual-scroll-demo.component';
import { ScrollItemComponent } from './scroll-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PushModule } from '@rx-angular/template';
import { RouterModule } from '@angular/router';
import { ROUTES } from './virtual-scroll-demo.routes';


@NgModule({
  declarations: [VirtualScrollDemoComponent, ScrollItemComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    RouterModule.forChild(ROUTES),
    PushModule
  ]
})

export class VirtualScrollDemoModule {
}

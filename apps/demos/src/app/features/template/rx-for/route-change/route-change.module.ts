import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { RxFor } from '@rx-angular/template/for';
import { RxLet } from '@rx-angular/template/let';
import { BgColorPipe } from './bg-color.pipe';
import { RouteChangeComponent } from './route-change.component';
import { RoutedNgForComponent } from './routed-ng-for.component';
import { RoutedRxForComponent } from './routed-rx-for.component';

const routes: Routes = [
  {
    path: '',
    component: RouteChangeComponent,
    children: [
      {
        path: 'native',
        component: RoutedNgForComponent,
      },
      {
        path: 'rx-for',
        component: RoutedRxForComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    RouteChangeComponent,
    RoutedNgForComponent,
    RoutedRxForComponent,
    BgColorPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    RxFor,
    RxLet,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
})
export class RouteChangeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { ForModule } from '@rx-angular/template/for';
import { LetModule } from '@rx-angular/template/let';
import { RouteChangeComponent } from './route-change.component';
import { RoutedNgForComponent } from './routed-ng-for.component';
import { RoutedRxForComponent } from './routed-rx-for.component';
import { BgColorPipe } from './bg-color.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

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
    ForModule,
    LetModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
})
export class RouteChangeModule {}

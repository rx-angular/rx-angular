import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxStateParentCompositionComponent } from './composition/parent.component';
import { RxStateOverviewComponent } from './rx-state.overview.component';
import { ROUTES as RX_STATE_ROUTES } from './rx-state.routes';
import { RxStateChildSelectionsComponent } from './selections/child.component';
import { RxStateParentSelectionsComponent } from './selections/parent.component';
import { RxStateSelectSliceComponent } from './selectslice/select-slice.component';
import { RxStateParentSubscriptionComponent } from './subscription/parent.component';
import { RxStateParentSubscriptionLessComponent } from './subscription-less-interaction/parent.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RX_STATE_ROUTES),
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RxLet,
    RxPush,
    FormsModule,
    ReactiveFormsModule,
    RxStateOverviewComponent,
    RxStateChildSelectionsComponent,
    RxStateParentCompositionComponent,
    RxStateParentSelectionsComponent,
    RxStateParentSubscriptionComponent,
    RxStateParentSubscriptionLessComponent,
    RxStateSelectSliceComponent,
  ],
})
export class RxStateModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PushModule } from '@rx-angular/template/push';
import { RxLet } from '@rx-angular/template/let';
import { RouterModule } from '@angular/router';
import { ROUTES as RX_STATE_ROUTES } from './rx-state.routes';

import { RxStateOverviewComponent } from './rx-state.overview.component';
import { RxStateParentCompositionComponent } from './composition/parent.component';
import { RxStateParentSubscriptionComponent } from './subscription/parent.component';
import { RxStateParentSelectionsComponent } from './selections/parent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxStateChildSelectionsComponent } from './selections/child.component';
import { RxStateParentSubscriptionLessComponent } from './subscription-less-interaction/parent.component';
import { RxStateSelectSliceComponent } from './selectslice/select-slice.component';

@NgModule({
  declarations: [
    RxStateOverviewComponent,
    RxStateChildSelectionsComponent,
    RxStateParentCompositionComponent,
    RxStateParentSelectionsComponent,
    RxStateParentSubscriptionComponent,
    RxStateParentSubscriptionLessComponent,
    RxStateSelectSliceComponent,
  ],
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
    PushModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RxStateModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ReactiveComponentModule} from '../../../projects/component/src';
import {RouterModule} from '@angular/router';
import {ROUTES as RX_STATE_ROUTES} from './rx-state.routes';

import {RxStateParent01Component} from './01/parent.component';
import {RxStateOverviewComponent} from './rx-state.overview.component';

@NgModule({
    declarations: [
        RxStateParent01Component,
        RxStateOverviewComponent
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
        ReactiveComponentModule
    ]
})
export class RxStateModule {
}

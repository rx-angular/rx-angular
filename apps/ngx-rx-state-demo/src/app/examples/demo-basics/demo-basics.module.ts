import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {DemoBasicsComponent1} from "./1/demo-basics-1.component";
import {DemoBasicsComponent2} from "./2/demo-basics-2.component";
import {DemoBasicsComponent3} from "./3/demo-basics-3.component";
import {DemoBasicsComponent4} from "./4/demo-basics-4.component";
import {DemoBasicsContainerComponent} from "./demo-basics.container.component";

export const ROUTES = [
    {
        path: '',
        component: DemoBasicsContainerComponent
    }
];
const DECLARATIONS = [
    DemoBasicsContainerComponent,
    DemoBasicsComponent1,
    DemoBasicsComponent2,
    DemoBasicsComponent3,
    DemoBasicsComponent4
];
export const materialModules = [
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule
];

@NgModule({
    declarations: [DECLARATIONS],
    imports: [
        CommonModule,
        materialModules
    ],
    exports: [DECLARATIONS]
})
export class DemoBasicsModule {
}

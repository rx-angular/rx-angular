import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
} from "@angular/material";
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

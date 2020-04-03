import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveComponentModule} from '@component'; //'@ngrx/component';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ROUTES} from './app.routing';
import {MatExpansionModule} from '@angular/material/expansion';
import {ConfigPanelComponent} from './config-panel.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {ZonelessHelpersModule} from '@zoneless-helpers';

@NgModule({
    declarations: [
        AppComponent, ConfigPanelComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES),
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatChipsModule,
        MatExpansionModule,
        RouterModule,
        ZonelessHelpersModule,
        ReactiveComponentModule
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

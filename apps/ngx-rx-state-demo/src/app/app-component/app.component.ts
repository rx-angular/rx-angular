import {Component} from '@angular/core';
import {AppViewModel} from "./app.view.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [AppViewModel]
})
export class AppComponent {
    constructor(public vm: AppViewModel) {

    }
}

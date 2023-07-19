import { Component } from '@angular/core';
import {MENU_ITEMS} from "./app.menu";


@Component({
  selector: 'rx-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuItems = MENU_ITEMS;
}

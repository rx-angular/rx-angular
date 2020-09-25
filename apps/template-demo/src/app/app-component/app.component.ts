import { Component } from '@angular/core';
import { AppViewModel } from './app.view.model';
import { MENU_ITEMS } from '../app.menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppViewModel],
})
export class AppComponent {
  menuItems = MENU_ITEMS;
  constructor(public vm: AppViewModel) {}
}

import { Component } from '@angular/core';
import { AppPresenter } from './app-presenter.service';
import { MENU_ITEMS } from './app.menu';

@Component({
  selector: 'rxa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppPresenter],
})
export class AppComponent {
  menuItems = MENU_ITEMS;
  constructor(public vm: AppPresenter) {}
}

import { BreakpointObserver } from '@angular/cdk/layout';
import { ApplicationRef, Component, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { isNgZone } from '@rx-angular/template';
import { MENU_ITEMS } from './app.menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  thisRef = this;
  readonly env = environment;

  menuItems = MENU_ITEMS;

  constructor(
    private ngZone: NgZone,
    private breakPointObserver: BreakpointObserver,
    private router: Router,
    private appRef: ApplicationRef
  ) {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        filter(() => !isNgZone(ngZone)),
        tap((e) => this.appRef.tick())
      )
      .subscribe();
  }
}

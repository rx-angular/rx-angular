import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AppShellModule } from '../app-shell/index';
import { ThemeService } from '../shared/theme.service';
import { AppPresenter } from './app-presenter.service';
import { MENU_ITEMS } from './app.menu';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'rxa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppPresenter],
  imports: [
    AppShellModule,
    RouterOutlet,
    RouterLink,
    MatIconButton,
    MatIcon,
    MatTooltip,
    AsyncPipe,
  ],
})
export class AppComponent implements AfterViewInit {
  menuItems = MENU_ITEMS;

  constructor(
    public vm: AppPresenter,
    public theme: ThemeService,
    router: Router,
  ) {
    performance.mark('startRouting');
    router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        tap(() => console.log('endRouting')),
        tap(() => performance.mark('endRouting')),
        take(1),
      )
      .subscribe();
  }

  ngAfterViewInit() {
    if (window.performance) {
      const performance = window.performance.toJSON();
      console.log(performance);
      const result = {};
      Object.entries(performance.timing).map(([name, startTime]) => {
        result[name] = startTime;
      });

      for (const [key, val] of Object.entries(result)) {
        console.log(`${key}: ${Math.round(val as number)}ms`);
      }

      console.log(
        'domContentLoadedEventEnd :' +
          `${
            Math.round(performance.timing.domContentLoadedEventEnd) -
            Math.round(performance.timeOrigin)
          }ms`,
      );
      console.log(
        'domComplete :' +
          `${
            Math.round(performance.timing.domComplete) -
            Math.round(performance.timeOrigin)
          }ms`,
      );
      console.log(
        'loadEventEnd :' +
          `${
            Math.round(performance.timing.loadEventEnd) -
            Math.round(performance.timeOrigin)
          }ms`,
      );
    } else {
      console.log("Performance timing isn't supported.");
    }
  }
}

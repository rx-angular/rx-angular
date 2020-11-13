import { AfterViewInit, Component } from '@angular/core';
import { AppPresenter } from './app-presenter.service';
import { MENU_ITEMS } from './app.menu';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take, tap } from 'rxjs/operators';
import { consoleTestResultHandler } from 'tslint/lib/test';

@Component({
  selector: 'rxa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppPresenter],
})
export class AppComponent implements AfterViewInit {
  menuItems = MENU_ITEMS;
  constructor(public vm: AppPresenter, router: Router) {
    performance.mark('startRouting');
    router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      tap(() => console.log('endRouting')),
      tap(() => performance.mark('endRouting')),
      take(1)
    ).subscribe()
  }

  ngAfterViewInit() {
      if (window.performance) {
        const performance = window.performance;
        const performanceEntries = Object.keys(performance.timing.toJSON());
        performanceEntries.forEach( (performanceEntry, i, entries) => {
          console.log("The time to " + performanceEntry + " was " + performance.timing[performanceEntry] + " milliseconds.");
        });
      } else {
        console.log('Performance timing isn\'t supported.');
      }
  }
}

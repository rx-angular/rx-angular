import { Component } from '@angular/core';
import { update } from '@rx-angular/state';
import { merge, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Hero, heroes } from '../data';

@Component({
  selector: 'app-for-poc-advanced-parent',
  template: `
    <h2>
      RxFor Advanced Implementation
    </h2>

    <button [unpatch] (click)="toggleClick$.next($event)">
      refresh data
    </button>

    <renders></renders>

    <div class="item-list">
      <div class="item" *pocForAdvanced="items$; let item; trackBy: trackHero">
        <renders></renders>
        {{ item.name }}
        <button [unpatch] (click)="toggleUpdate$.next(item)">
          update me
        </button>
      </div>
    </div>
  `,
  styles: [
      `
      .item-list {
        display: flex;
        flex-flow: column;
      }

      .item {
        padding: 1rem;
        outline: 1px solid darkmagenta;
      }
    `
  ],
  changeDetection: environment.changeDetection,
})
export class ForPocAdvancedParentComponent {
  toggleClick$ = new Subject<Event>();
  toggleUpdate$ = new Subject<Hero>();
  items$ = merge(
    this.toggleClick$.pipe(
      map(() => [...heroes]),
    ),
    this.toggleUpdate$.pipe(
      map(({ id, name }) => update(heroes, { id, name: `n_${ name }` }, 'id')),
    )
  );

  trackHero(index: number, hero: Hero): number {
    return hero.id;
  }
}

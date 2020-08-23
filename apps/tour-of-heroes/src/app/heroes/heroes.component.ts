import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { ConfigService } from '../config.service';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

interface HeroesComponentState {
  heroes: Hero[];
}

const initHeroesComponentState: Partial<HeroesComponentState> = {
  heroes: []
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent {
  heroes: Hero[];

  readonly heroes$: Observable<Hero[]> = this.state.select('heroes');
  readonly add = new Subject<string>();
  readonly delete = new Subject<Hero>();

  private readonly _heroAdded$ = this.add.pipe(
    switchMap(name => this.heroService.addHero({ name } as Hero))
  );
  private readonly _heroDeleted$ = this.delete.pipe(
    switchMap(deletedHero =>
      this.heroService.deleteHero(deletedHero).pipe(
        map(hero => {
          // no hero means error, we have to revert the optimistic change
          if (!hero) {
            return [...this.state.get().heroes, deletedHero];
          }
          return null;
        }),
        // apply optimistic change
        startWith(this.state.get().heroes.filter(h => h.id !== deletedHero.id)),
        // only apply optimistic change and the revert if needed
        filter(change => change !== null)
      )
    )
  );

  constructor(
    public heroService: HeroService,
    private state: RxState<HeroesComponentState>,
    public configService: ConfigService
  ) {
    this.state.set(initHeroesComponentState);
    this.state.hold(this.state.select(), console.log);
    this.state.connect('heroes', this.heroService.getHeroes());
    this.state.connect('heroes', this._heroDeleted$);
    this.state.connect(this._heroAdded$, (oldState, addedHero) => ({
      heroes: [...oldState.heroes, addedHero]
    }));
  }

  trackHero(idx: number, hero: Hero): number {
    return hero.id;
  }
}

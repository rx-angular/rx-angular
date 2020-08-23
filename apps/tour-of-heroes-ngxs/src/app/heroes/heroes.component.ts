import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from '../config.service';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroStateService } from '../ngxs/hero-feature/hero.state';

interface HeroesComponentState {
  heroes: Hero[];
}

const initHeroesComponentState: Partial<HeroesComponentState> = {
  heroes: [],
};

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [RxState],
})
export class HeroesComponent {
  heroes: Hero[];

  readonly heroes$: Observable<Hero[]> = this.state.select('heroes');
  readonly add = new Subject<string>();
  readonly delete = new Subject<Hero>();

  constructor(
    public heroService: HeroService,
    private state: RxState<HeroesComponentState>,
    public configService: ConfigService,
    private heroState: HeroStateService
  ) {
    this.heroState.dispatchFetchHero();

    this.state.set(initHeroesComponentState);
    this.state.connect('heroes', this.heroState.heroes$);

    this.state.hold(
      this.add.pipe(switchMap((name) => this.heroState.dispatchAddHero(name)))
    );

    this.state.hold(
      this.delete.pipe(
        switchMap((hero) => this.heroState.dispatchDeleteHero(hero))
      )
    );
  }
}

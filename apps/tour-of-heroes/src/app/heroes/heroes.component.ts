import { Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { merge, Observable, Subject } from 'rxjs';
import { switchMap, switchMapTo } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

interface HeroesComponentState {
  heroes: Hero[];
}

const initHeroesComponentState: Partial<HeroesComponentState> = {
  heroes: []
};

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [RxState]
})
export class HeroesComponent {
  heroes: Hero[];

  readonly heroes$: Observable<Hero[]> = this.state.select('heroes');
  readonly add = new Subject<string>();
  readonly delete = new Subject<Hero>();
  private readonly _heroAdded$ = this.add.pipe(
    switchMap(name => this.heroService.addHero({ name } as Hero))
  );

  constructor(
    private heroService: HeroService,
    private state: RxState<HeroesComponentState>
  ) {
    this.state.set(initHeroesComponentState);
    this.state.connect('heroes', this.heroService.getHeroes());
    this.state.connect(this._heroAdded$, (oldState, addedHero) => ({
      heroes: [...oldState.heroes, addedHero]
    }));
  }

  /*delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }*/
}

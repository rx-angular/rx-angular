import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ConfigService } from '../config.service';

import { Hero } from '../hero';
import { HeroStateService } from '../ngxs/hero-feature/hero.state';

interface HeroDetailComponentState {
  hero: Hero;
}

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  providers: [RxState],
})
export class HeroDetailComponent {
  readonly hero$ = this.state.select('hero');

  readonly change$ = new Subject<Partial<Hero>>();
  readonly save$ = new Subject<Hero>();

  constructor(
    private route: ActivatedRoute,
    private heroState: HeroStateService,
    private location: Location,
    private state: RxState<HeroDetailComponentState>,
    public configService: ConfigService
  ) {
    const hero$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.heroState.hero$(parseInt(params.get('id'), 10))
      )
    );
    this.state.connect('hero', hero$);
    const saveEffect$ = this.save$.pipe(
      withLatestFrom(this.change$),
      map(([oldHero, change]) => ({ ...oldHero, ...change })),
      switchMap((hero) => this.heroState.dispatchUpdateHero(hero)),
      tap(() => this.goBack())
    );
    this.state.hold(saveEffect$);
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
    this.save$.next(hero);
  }
}

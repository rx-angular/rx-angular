import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

interface HeroDetailComponentState {
  hero: Hero;
}

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  providers: [RxState]
})
export class HeroDetailComponent {
  readonly hero$ = this.state.select('hero');

  readonly save$ = new Subject<Hero>();

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private state: RxState<HeroDetailComponentState>
  ) {
    const hero$ = this.route.paramMap.pipe(
      switchMap(id => this.heroService.getHero(Number(id)))
    );
    this.state.connect('hero', hero$);
    const saveEffect$ = this.save$.pipe(
      switchMap(hero => this.heroService.updateHero(hero)),
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

import { Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ConfigService } from '../config.service';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

interface DashboardComponentState {
  heroes: Hero[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [RxState]
})
export class DashboardComponent {
  readonly heroes$ = this.state.select('heroes');

  constructor(
    private heroService: HeroService,
    private state: RxState<DashboardComponentState>,
    public configService: ConfigService
  ) {
    this.state.connect('heroes', this.heroService.getHeroes());
  }
}

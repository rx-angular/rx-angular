import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ConfigService } from '../config.service';
import { Hero } from '../hero';
import { HeroStateService } from '../ngxs/hero-feature/hero.state';

interface DashboardComponentState {
  heroes: Hero[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [RxState],
})
export class DashboardComponent {
  readonly heroes$ = this.state.select('heroes');

  constructor(
    private heroState: HeroStateService,
    private state: RxState<DashboardComponentState>,
    public configService: ConfigService
  ) {
    this.heroState.dispatchFetchHero();
    this.state.connect('heroes', this.heroState.heroes$);
  }
}

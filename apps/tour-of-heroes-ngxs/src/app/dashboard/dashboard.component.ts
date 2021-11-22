import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state/state';
import { ConfigService } from '../config.service';
import { Hero } from '../hero';
import { HeroStateFacade } from '../ngxs/hero-feature/hero.facade';

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
    private heroState: HeroStateFacade,
    private state: RxState<DashboardComponentState>,
    public configService: ConfigService
  ) {
    this.heroState.dispatchFetchHero();
    this.state.connect('heroes', this.heroState.heroes$);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ConfigService } from '../config.service';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

interface DashboardComponentState {
  heroes: Hero[];
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  trackHero(idx: number, hero: Hero): number {
    return hero.id;
  }
}

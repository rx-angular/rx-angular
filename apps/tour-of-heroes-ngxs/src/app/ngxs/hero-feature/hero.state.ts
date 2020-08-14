import { Action, Actions, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  AddHero,
  DeleteHero,
  FetchHero,
  SearchHero,
  UpdateHero,
} from './hero.actions';
import { HeroService } from '../../hero.service';
import { Hero } from '../../hero';
import { Observable } from 'rxjs';
import { getHeroes, getHeroesById, getSearch } from './hero.selectors';

export interface HeroState {
  heroes: Hero[];
  search: Hero[];
}

@State<HeroState>({
  name: 'hero',
  defaults: {
    heroes: [] as Hero[],
    search: [] as Hero[],
  },
})
@Injectable({ providedIn: 'root' })
export class HeroStateService {
  search$ = this.store.select(getSearch);
  heroes$ = this.store.select(getHeroes);
  hero$ = (id: number): Observable<Hero> =>
    this.store.select(getHeroesById(id));

  dispatchFetchHero() {
    return this.store.dispatch(new FetchHero());
  }

  @Action(FetchHero)
  private fetchHero(ctx: StateContext<HeroState>, a) {
    this.heroService.getHeroes().subscribe((heroes) => {
      ctx.setState({
        ...ctx.getState(),
        heroes,
      });
    });
  }

  dispatchAddHero(name: string) {
    return this.store.dispatch(new AddHero({ name }));
  }

  @Action(AddHero)
  private addHero(ctx: StateContext<HeroState>, action: AddHero) {
    const state = ctx.getState();
    this.heroService.addHero(action.hero).subscribe((hero) => {
      ctx.setState({
        ...state,
        heroes: [...state.heroes, hero],
      });
    });
  }

  dispatchDeleteHero(hero: Pick<Hero, 'id'>) {
    return this.store.dispatch(new DeleteHero(hero));
  }

  @Action(DeleteHero)
  private deleteHero(ctx: StateContext<HeroState>, action: DeleteHero) {
    const state = ctx.getState();
    this.heroService.deleteHero(action.hero).subscribe(() => {
      ctx.setState({
        ...state,
        heroes: state.heroes.filter((h: Hero) => h.id !== action.hero.id),
      });
    });
  }

  dispatchUpdateHero(hero: Hero) {
    return this.store.dispatch(new UpdateHero(hero));
  }

  @Action(UpdateHero)
  private updateHero(ctx: StateContext<HeroState>, action: UpdateHero) {
    const state = ctx.getState();
    this.heroService.updateHero(action.hero).subscribe(() => {
      ctx.setState({
        ...state,
        heroes: state.heroes.map((h: Hero) =>
          h.id === action.hero.id ? action.hero : h
        ),
      });
    });
  }

  dispatchSearchHero(name: string) {
    return this.store.dispatch(new SearchHero(name));
  }

  @Action(SearchHero)
  private searchHero(ctx: StateContext<HeroState>, action: SearchHero) {
    const state = ctx.getState();
    this.heroService.searchHeroes(action.term).subscribe((heroes) => {
      ctx.setState({
        ...state,
        heroes,
      });
    });
  }

  constructor(
    private store: Store,
    private actions: Actions,
    private heroService: HeroService
  ) {}
}

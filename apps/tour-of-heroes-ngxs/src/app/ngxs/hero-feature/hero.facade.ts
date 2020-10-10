import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Hero } from '../../hero';
import {
  AddHero,
  DeleteHero,
  FetchHero,
  SearchHero,
  UpdateHero
} from './hero.actions';
import { HeroesSelectors } from './hero.selectors';

@Injectable({ providedIn: 'root' })
export class HeroStateFacade {
  search$ = this.store.select(HeroesSelectors.props.search);
  heroes$ = this.store.select(HeroesSelectors.props.heroes);

  hero$ = (id: number): Observable<Hero> =>
    this.store.select(HeroesSelectors.getHeroesById(id));

  dispatchFetchHero() {
    return this.store.dispatch(new FetchHero());
  }

  dispatchAddHero(name: string) {
    return this.store.dispatch(new AddHero({ name }));
  }

  dispatchDeleteHero(hero: Pick<Hero, 'id'>) {
    return this.store.dispatch(new DeleteHero(hero));
  }

  dispatchUpdateHero(hero: Hero) {
    return this.store.dispatch(new UpdateHero(hero));
  }

  dispatchSearchHero(name: string) {
    return this.store.dispatch(new SearchHero(name));
  }

  constructor(private store: Store) {}
}

import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import {
  insertItem,
  patch,
  removeItem,
  updateItem
} from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';
import {
  AddHero,
  DeleteHero,
  FetchHero,
  SearchHero,
  UpdateHero
} from './hero.actions';

export interface HeroStateModel {
  heroes: Hero[];
  search: Hero[];
}

@State<HeroStateModel>({
  name: 'hero',
  defaults: {
    heroes: [] as Hero[],
    search: [] as Hero[]
  }
})
@Injectable({ providedIn: 'root' })
export class HeroState {
  @Action(FetchHero)
  private fetchHero(ctx: StateContext<HeroStateModel>) {
    return this.heroService.getHeroes().pipe(tap(heroes => {
      ctx.setState(patch({
        heroes
      }));
    }));
  }

  @Action(AddHero)
  private addHero(ctx: StateContext<HeroStateModel>, action: AddHero) {
    return this.heroService.addHero(action.hero).pipe(tap(hero => {
      ctx.setState(
        patch({
          heroes: insertItem(hero)
        })
      );
    }));
  }

  @Action(DeleteHero)
  private deleteHero(ctx: StateContext<HeroStateModel>, action: DeleteHero) {
    return this.heroService.deleteHero(action.hero).pipe(tap(() => {
      ctx.setState(
        patch({
          heroes: removeItem((h: Hero) => h.id === action.hero.id)
        })
      );
    }));
  }

  @Action(UpdateHero)
  private updateHero(ctx: StateContext<HeroStateModel>, action: UpdateHero) {
    return this.heroService.updateHero(action.hero).pipe(tap(() => {
      ctx.setState(
        patch({
          heroes: updateItem((h: Hero) => h.id === action.hero.id, action.hero)
        })
      );
    }));
  }

  @Action(SearchHero)
  private searchHero(ctx: StateContext<HeroStateModel>, action: SearchHero) {
    return this.heroService.searchHeroes(action.term).pipe(tap(heroes => {
      ctx.setState(
        patch({
          heroes
        })
      );
    }));
  }

  constructor(private heroService: HeroService) {}
}

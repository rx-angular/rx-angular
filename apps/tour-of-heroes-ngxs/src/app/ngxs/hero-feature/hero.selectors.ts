import { createSelector, Selector } from '@ngxs/store';
import { createPropertySelector } from '../../createPropertySelector';
import { Hero } from '../../hero';
import { HeroState, HeroStateModel } from './hero.state';

export class HeroesSelectors {
  static props = createPropertySelector<HeroStateModel>(HeroState);

  @Selector()
  static getHeroesById(id: number) {
    return createSelector([HeroesSelectors.props.heroes], (heroes: Hero[]) =>
      heroes.filter(h => h.id === id).pop()
    );
  }
}

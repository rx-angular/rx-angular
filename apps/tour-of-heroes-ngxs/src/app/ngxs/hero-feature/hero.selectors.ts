import { createSelector, Selector } from '@ngxs/store';
import { createPropertySelector } from '../../createPropertySelector';
import { Hero } from '../../hero';
import { HeroStateModel, HeroState } from './hero.state';

export class HeroesSelectors {
  static props = createPropertySelector<HeroStateModel>(HeroState);

  @Selector()
  static getHeroesById(id: number) {
    return createSelector([HeroesSelectors.props.heroes], (heroes: Hero[]) =>
      heroes.filter(h => h.id === id).pop()
    );
  }
}

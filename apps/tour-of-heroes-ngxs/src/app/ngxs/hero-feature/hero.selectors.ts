import { Hero } from '../../hero';

export function getHeroes(s): Hero[] {
  return s.hero.heroes;
}
export function getSearch(s): Hero[] {
  return s.hero.search;
}

export function getHeroesById(id: number) {
  return (s): Hero => {
    return getHeroes(s)
      .filter((h) => h.id === id)
      .pop();
  };
}

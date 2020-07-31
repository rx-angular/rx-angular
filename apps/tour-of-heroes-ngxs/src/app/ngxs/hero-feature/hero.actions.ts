import { Hero } from '../../hero';

export class AddHero {
  static readonly type = 'Add Hero';
  constructor(public hero: Omit<Hero, 'id'>) {}
}
export class UpdateHero {
  static readonly type = 'Update Hero';
  constructor(public hero: Hero) {}
}
export class DeleteHero {
  static readonly type = 'Delete Hero';
  constructor(public hero: Pick<Hero, 'id'>) {}
}
export class FetchHero {
  static readonly type = 'Fetch Hero';
}
export class SearchHero {
  static readonly type = 'Search Hero';
  constructor(public term: string) {}
}

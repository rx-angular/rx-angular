import { ComparableData } from '../interfaces/comparable-data-type';
import { valuesComparer } from '../_internals/valuesComparer.util';
import { isDefined } from '../../core';

/**
 * @description
 * Updates one or multiple items in an array T[].
 * For comparison you can provide key, array of keys or a custom comparison function that should return true if items match.
 * If no comparison is provided, an equality check is used by default.
 * Returns a shallow copy of the array T[] and updated items, does not mutate the original array.
 *
 * @example
 * // Update with comparison function
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];
 *
 * const newCat = {id: 1, type: 'lion'};
 *
 * const updatedCreatures = update(creatures, newCat, (a, b) => a.id === b.id);
 *
 * // updatedCreatures will be:
 * // [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
 *
 * @example
 * // Update with key
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];
 *
 * const newCat = {id: 1, type: 'lion'};
 *
 * const updatedCreatures = update(creatures, newCat, 'id');
 *
 * // updatedCreatures will be:
 * // [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
 *
 * @example
 * // Update with array of keys
 *
 * const creatures = [{id: 1, type: 'cat', name: 'Bella'}, {id: 2, type: 'dog', name: 'Sparky'}];
 *
 * const newCat = {id: 1, type: 'lion', name: 'Bella'};
 *
 * const updatedCreatures = update(creatures, newCat, ['id', 'name']);
 *
 * // updatedCreatures will be:
 * // [{id: 1, type: 'lion', name: 'Bella'}, {id: 2, type: 'dog', name: 'Sparky'}];
 *
 * @example
 * // Usage with RxState
 *
 * export class ListComponent {
 *
 *    readonly updateCreature$ = new Subject<Creature>();
 *
 *    constructor(private state: RxState<ComponentState>) {
 *      // Reactive implementation
 *      state.connect(
 *        'creatures',
 *        this.updateCreature$,
 *        ({ creatures }, creatureToUpdate) => {
 *            return update(creatures, creatureToRemove, (a, b) => a.id === b.id);
 *        }
 *      );
 *    }
 *
 *    // Imperative implementation
 *    updateCreature(creatureToUpdate: Creature): void {
 *        this.state.set({ creatures: update(this.state.get().creatures, creatureToUpdate, (a, b) => a.id === b.id)});
 *    }
 * }
 *
 * @returns T[]
 *
 * @docsPage update
 * @docsCategory transformation-helpers
 */
export function update<T extends object>(
  source: T[],
  updates: Partial<T>[] | Partial<T>,
  compare?: ComparableData<T>
): T[] {
  const updatesAsArray = updates
    ? Array.isArray(updates)
      ? updates
      : [updates]
    : [];

  const sourceDefined = isDefined(source);
  const sourceIsArray = Array.isArray(source);
  const invalidInput = !sourceIsArray && !isDefined(updates);

  if (sourceDefined && !sourceIsArray) {
    console.warn(`Update: Original value (${source}) is not an array.`);
  }

  if (invalidInput) {
    return source;
  }

  if (!sourceDefined || !source.length || !sourceIsArray) {
    return [...updatesAsArray] as T[];
  }

  return source.map((existingItem) => {
    const match = updatesAsArray.find((item) =>
      valuesComparer(item as T, existingItem, compare)
    );

    if (match) {
      return { ...existingItem, ...match };
    }

    return existingItem;
  });
}

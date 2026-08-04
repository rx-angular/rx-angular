import {
  isDefined,
  isKeyOf,
  OnlyKeysOfSpecificType,
} from '../_internals/guards';

/**
 * @description
 * Converts an array of objects to a dictionary {[key: string]: T}.
 * Accepts array T[] and key of type string, number or symbol as inputs.
 * Alternatively a selector function can be passed to derive the key from an item,
 * e.g. when the key lives on a nested property.
 *
 *
 * @example
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}];
 *
 * const creaturesDictionary = toDictionary(creatures, 'id');
 *
 * // creaturesDictionary will be:
 * // {
 * //  1: {id: 1, type: 'cat'},
 * //  2: {id: 2, type: 'dog'},
 * //  3: {id: 3, type: 'parrot'}
 * // };
 * @example
 * // Usage with a nested property
 *
 * const creatures = [{id: 1, meta: {name: 'cat'}}, {id: 2, meta: {name: 'dog'}}];
 *
 * const creaturesDictionary = toDictionary(creatures, (creature) => creature.meta.name);
 *
 * // creaturesDictionary will be:
 * // {
 * //  cat: {id: 1, meta: {name: 'cat'}},
 * //  dog: {id: 2, meta: {name: 'dog'}}
 * // };
 * @example
 * // Usage with RxState
 *
 * export class ListComponent {
 *
 *    readonly convertToDictionary$ = new Subject();
 *
 *    constructor(private state: RxState<ComponentState>) {
 *      // Reactive implementation
 *      state.connect(
 *        'creaturesDictionary',
 *        this.convertToDictionary$,
 *        ({ creatures }) => {
 *            return toDictionary(creatures, 'id');
 *        }
 *      );
 *    }
 *
 *    // Imperative implementation
 *    convertToDictionary(): void {
 *        this.state.set({ creaturesDictionary: toDictionary(this.state.get().creatures, 'id')});
 *    }
 * }
 *
 * @see {@link OnlyKeysOfSpecificType}
 * @param {OnlyKeysOfSpecificType<T, S> | ((item: T) => number | string | symbol)} key
 * @returns { [key: string]: T }
 * @docsPage toDictionary
 * @docsCategory transformation-helpers
 */
export function toDictionary<T extends object>(
  source: T[],
  key: DictionaryKey<T>,
): { [key: string]: T } {
  if (!isDefined(source)) {
    return source;
  }

  const sourceEmpty = !source.length;

  if (
    !Array.isArray(source) ||
    sourceEmpty ||
    !isKeyOf<T>(keyValue(source[0], key))
  ) {
    if (!sourceEmpty) {
      console.warn('ToDictionary: unexpected input params.');
    }
    return {};
  }

  const dictionary: { [key: string]: T } = {};
  const length = source.length;
  let i = 0;

  for (i; i < length; i++) {
    dictionary[`${keyValue(source[i], key)}`] = Object.assign(
      Object.create(Object.getPrototypeOf(source[i])),
      source[i],
    );
  }

  return dictionary;
}

type DictionaryKey<T> =
  | OnlyKeysOfSpecificType<T, number>
  | OnlyKeysOfSpecificType<T, string>
  | OnlyKeysOfSpecificType<T, symbol>
  | ((item: T) => number | string | symbol);

function keyValue<T extends object>(item: T, key: DictionaryKey<T>): unknown {
  return typeof key === 'function' ? key(item) : item[key];
}

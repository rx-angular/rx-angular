// Source https://github.com/thinkloop/memoizerific/blob/master/src/memoizerific.js

export function memo(limit): (fn: (...args: any[]) => any) => any {
  const cache = new Map(),
    lru = [];

  // returns memoize factory
  return (fn: (...args: any[]) => any) => {
    const memoize = function() {
      const argsLengthMinusOne = arguments.length - 1,
        lruPath = Array(argsLengthMinusOne + 1);
      let currentCache = cache,
        newMap,
        isMemoized = true,
        fnResult,
        i;

      // @ts-ignore
      if ((memoize.numArgs || memoize.numArgs === 0) && memoize.numArgs !== argsLengthMinusOne + 1) {
        throw new Error('Memoize functions should always be called with the same number of arguments');
      }

      // loop through each argument to traverse the map tree
      for (i = 0; i < argsLengthMinusOne; i++) {
        lruPath[i] = {
          cacheItem: currentCache,
          arg: arguments[i]
        };

        // climb through the hierarchical map tree until the second-last argument has been found, or an argument is missing.
        // if all arguments up to the second-last have been found, this will potentially be a cache hit (determined later)
        if (currentCache.has(arguments[i])) {
          currentCache = currentCache.get(arguments[i]);
          continue;
        }

        isMemoized = false;

        // make maps until last value
        newMap = new Map();
        currentCache.set(arguments[i], newMap);
        currentCache = newMap;
      }

      // we are at the last arg, check if it is really memoized
      if (isMemoized) {
        if (currentCache.has(arguments[argsLengthMinusOne])) {
          fnResult = currentCache.get(arguments[argsLengthMinusOne]);
        } else {
          isMemoized = false;
        }
      }

      // if the result wasn't memoized, compute it and cache it
      if (!isMemoized) {
        fnResult = fn.apply(null, arguments);
        currentCache.set(arguments[argsLengthMinusOne], fnResult);
      }

      // if there is a cache limit, purge any extra results
      if (limit > 0) {
        lruPath[argsLengthMinusOne] = {
          cacheItem: currentCache,
          arg: arguments[argsLengthMinusOne]
        };

        if (isMemoized) {
          moveToMostRecentLru(lru, lruPath);
        } else {
          lru.push(lruPath);
        }

        if (lru.length > limit) {
          removeCachedResult(lru.shift());
        }
      }

      memoize.wasMemoized = isMemoized;
      // @ts-ignore
      memoize.numArgs = argsLengthMinusOne + 1;

      return fnResult;
    };

    memoize.limit = limit;
    memoize.wasMemoized = false;
    memoize.cache = cache;
    memoize.lru = lru;

    return memoize;
  };
};

// move current args to most recent position
function moveToMostRecentLru(lru, lruPath) {
  const lruLen = lru.length,
    lruPathLen = lruPath.length;
  let isMatch,
    i, ii;

  for (i = 0; i < lruLen; i++) {
    isMatch = true;
    for (ii = 0; ii < lruPathLen; ii++) {
      if (!isEqual(lru[i][ii].arg, lruPath[ii].arg)) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) {
      break;
    }
  }

  lru.push(lru.splice(i, 1)[0]);
}

// remove least recently used cache item and all dead branches
function removeCachedResult(removedLru) {
  const removedLruLen = removedLru.length;
  let tmp, currentLru = removedLru[removedLruLen - 1],
    i;

  currentLru.cacheItem.delete(currentLru.arg);

  // walk down the tree removing dead branches (size 0) along the way
  for (i = removedLruLen - 2; i >= 0; i--) {
    currentLru = removedLru[i];
    tmp = currentLru.cacheItem.get(currentLru.arg);

    if (!tmp || !tmp.size) {
      currentLru.cacheItem.delete(currentLru.arg);
    } else {
      break;
    }
  }
}

// check if the numbers are equal, or whether they are both precisely NaN (isNaN returns true for all non-numbers)
function isEqual(val1, val2) {
  return val1 === val2 || (val1 !== val1 && val2 !== val2);
}

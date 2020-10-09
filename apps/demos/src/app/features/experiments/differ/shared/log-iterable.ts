import { IterableChanges } from '@angular/core';
import { diffByIndex, diffByKey } from './rx-differ';

export function logIterable<T>(newData: IterableChanges<T>) {
  console.log('#################################');
  if (newData === null) {
    console.log('null change');
  } else {
    console.log('enter');
    newData.forEachAddedItem(console.log);
    console.log('move');
    newData.forEachMovedItem(console.log);
    console.log('remove');
    newData.forEachRemovedItem(console.log);
    console.log('identityChange');
    newData.forEachIdentityChange(console.log);
  }
}

export function logRxIterable<T>(indexDifferResult) {
  console.log('##diffByIndex');
  console.log('enter', indexDifferResult.enter);
  console.log('update', indexDifferResult.update);
  console.log('exit', indexDifferResult.exit);
};

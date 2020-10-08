import { IterableChanges } from '@angular/core';

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

import {
  ChangeDetectorRef,
  NgZone,
  ɵdetectChanges as detectChanges,
  ɵmarkDirty as markDirty,
} from '@angular/core';

import { isIvy } from './is-ivy';
import { hasZone } from './has-zone';

export function getChangeDetectionHandler(
  ngZone: NgZone,
  cdRef: ChangeDetectorRef
): <T>(component?: T) => void {
  if (isIvy()) {
    // TODO: evaluate this...
    return hasZone(ngZone) ? markDirty : detectChanges;
  } else {
    return hasZone(ngZone)
      ? cdRef.markForCheck.bind(cdRef)
      : cdRef.detectChanges.bind(cdRef);
  }
}

export function getDetectChanges(
  ngZone: NgZone,
  cdRef: ChangeDetectorRef
): <T>(component?: T) => void {
  if (isIvy()) {
    return detectChanges;
  } else {
    return cdRef.detectChanges.bind(cdRef);
  }
}

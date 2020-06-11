import { ChangeDetectorRef, ɵmarkDirty as markDirty } from '@angular/core';
import { Subscription } from 'rxjs';
import { scheduleCoalesced } from '../scheduling/scheduleCoalesced';

function getMarkDirty(cdRef: ChangeDetectorRef) {
  return (
    ref: {} | HTMLElement,
    options: {
      parent?: boolean;
      scheduleCD?: (work: () => void) => Subscription;
      afterCD?: () => void;
    }
  ): void => {
    if (options.parent) {
      markDirty(ref);
    } else {
      scheduleCoalesced(() => cdRef.detectChanges(), options.scheduleCD, ref);
    }
  };
}

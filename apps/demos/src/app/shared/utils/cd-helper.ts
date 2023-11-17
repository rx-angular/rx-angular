import { ApplicationRef, ChangeDetectorRef, Injectable } from '@angular/core';

@Injectable()
export class CdHelper {
  constructor(
    protected cdRef: ChangeDetectorRef,
    protected appRef: ApplicationRef
  ) {}

  appRef_tick() {
    this.appRef.tick();
  }
  cdRef_detectChanges() {
    this.cdRef.detectChanges();
  }

  cdRef_markForCheck() {
    this.cdRef.markForCheck();
  }

  markDirty() {
    throw new Error('not implemented, markDirty API was dropped');
  }

  detectChanges() {
    this.cdRef.detectChanges();
  }
}

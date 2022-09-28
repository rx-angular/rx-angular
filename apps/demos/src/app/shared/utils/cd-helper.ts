import { ApplicationRef, ChangeDetectorRef, Injectable, ɵdetectChanges } from '@angular/core';


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
    throw new Error('not implemented');
  }

  detectChanges() {
    ɵdetectChanges((this.cdRef as any).context);
  }
}

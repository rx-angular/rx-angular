import { ApplicationRef, ChangeDetectorRef, Injectable, ɵdetectChanges, ɵmarkDirty } from '@angular/core';


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
    ɵmarkDirty((this.cdRef as any).context);
  }

  detectChanges() {
    ɵdetectChanges((this.cdRef as any).context);
  }
}

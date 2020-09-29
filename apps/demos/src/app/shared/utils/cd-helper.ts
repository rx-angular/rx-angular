import { ChangeDetectorRef, Directive, Injectable, ɵdetectChanges, ɵmarkDirty } from '@angular/core';


@Injectable()
export class CdHelper {

  constructor(protected cdRef: ChangeDetectorRef) {}

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

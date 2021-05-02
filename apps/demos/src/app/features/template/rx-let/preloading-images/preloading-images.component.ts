import { ChangeDetectionStrategy, Component } from '@angular/core';
import { schedulingHelper } from '../../../../shared/debug-helper/value-provider/scheduling-helper';
import { placeholderImg } from '../../../../shared/debug-helper/value-provider';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'rxa-ngif-hack',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <button mat-raised-button (click)="sh.tick(1, [500, 0])">
          Delayed
        </button>
        <rxa-value-provider
          [changes$]="sh.ticks$"
          [buttons]="true"
          (resetState)="reset()"
          #valP="rxaValueProvider"
        ></rxa-value-provider>
      </div>
      <img [src]="url" *rxLet="valP.imgUrl$; let url; rxSuspense: sV" />
      <ng-template #sV><img [src]="placeholder" /></ng-template>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreloadingImagesComponent {
  sh = schedulingHelper();
  placeholder = this.domSanitizer.bypassSecurityTrustUrl(placeholderImg);

  constructor(public domSanitizer: DomSanitizer) {}

  reset() {
    this.sh = schedulingHelper();
  }
}

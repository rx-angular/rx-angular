import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'rxa-i-frame',
  template: `
    <iframe width="100%" height="100%" frameBorder="0" [src]="urlSafe"></iframe>`,
  host: {
    class: 'd-block w-100'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IFrameComponent implements OnInit {

  @Input()
  url;

  urlSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}

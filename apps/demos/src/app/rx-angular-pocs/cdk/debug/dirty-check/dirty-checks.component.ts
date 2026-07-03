import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'rxa-dirty-check',
  template: `
    <div class="dirty-check">
      <span class="indicator">{{ dirtyChecks() }}</span>
    </div>
  `,
  styles: [
    `
      :host .indicator {
        border: 1px solid #ffff005f;
      }
    `,
  ],
})
export class DirtyChecksComponent {
  readonly dirtyChecks = signal(0);

  @Input()
  log;

  ngDoCheck() {
    this.dirtyChecks.update((n) => n + 1);
    if (this.log) {
      console.log('dirtyCheck', this.log);
    }
  }
}

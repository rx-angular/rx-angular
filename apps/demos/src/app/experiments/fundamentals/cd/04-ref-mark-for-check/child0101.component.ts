import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cd04-child0101-push',
  template: `
    <h3>ChangeDetection Child 01 01</h3>
    ChangeDetectionStrategy: OnPush<br />
    <renders></renders><br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Child040101Component {}

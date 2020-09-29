import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-cd04-child0101-push',
  template: `
    <h3>ChangeDetection Child 01 01</h3>
    ChangeDetectionStrategy: OnPush<br/>
    <rxa-dirty-check></rxa-dirty-check><br/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Child040101Component {}

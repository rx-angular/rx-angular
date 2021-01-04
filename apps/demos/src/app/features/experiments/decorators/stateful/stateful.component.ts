import { Component, OnInit } from '@angular/core';
import { RxStateful } from '../../../../rx-angular-pocs/cdk/decorators/stateful';
import { StrategyProvider } from '../../../../rx-angular-pocs/cdk/render-strategies/strategy-provider.service';

@Component({
  selector: 'rxa-stateful',
  template: `
    <p>
      stateful works!
    </p>
  `,
  styles: [
  ]
})
export class StatefulComponent implements OnInit {

  @RxStateful()
  test: string;

  constructor() { }

  ngOnInit(): void {
    this.test = 'test';
  }

}

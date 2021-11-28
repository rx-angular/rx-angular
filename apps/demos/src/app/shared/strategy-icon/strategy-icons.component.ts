import { Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'rxa-strategy-icon',
  template: `
    <mat-icon *rxLet="strategy$; let strategy">{{strategy}}</mat-icon>`
})
export class StrategyIconComponent extends RxState<{ strategy: string }> {
  strategies = {
    'local': 'call_split',
    'global': 'vertical_align_bottom',
    'noop': 'block',
    'native': 'find_replace'
  };
  strategy$ = this.select('strategy');

  @Input()
  set strategy(strategy: string) {
    if (Object.keys(this.strategies).includes(strategy)) {
      this.set({ strategy });
    }
    this.set({ strategy: this.strategies.local });
  }

}

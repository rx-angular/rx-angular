import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

interface Local01State {
  value1: number;
  value2: number;
}

@Component({
  selector: 'rx-strategies-local01',
  changeDetection: environment.changeDetection,
  template: `
    <h1>Local 01</h1>
    <button (click)="change()">Click</button>
    <div style="border: 1px solid red; padding: 1rem">
      <h3>Component</h3>
      <ng-container *rxLet="value1$; let v; config: strategy">
        <span>value1: {{ v }}</span> </ng-container
      ><br />
      <ng-container *rxLet="value2$; let v; config: strategy">
        <span>value2: {{ v }}</span>
      </ng-container>
    </div>
  `,
})
export class Local01Component {
  readonly strategy = 'local';

  readonly state$ = new Subject<Local01State>();

  readonly value1$ = this.state$.pipe(pluck('value1'));
  readonly value2$ = this.state$.pipe(pluck('value2'));

  constructor() {}

  change() {
    const value1 = Math.floor(Math.random() * 100);
    const value2 = Math.floor(Math.random() * 100);
    this.state$.next({ value1, value2 });
  }
}

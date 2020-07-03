import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { getStrategies, StrategySelection } from '@rx-angular/template';

@Component({
  selector: 'coalesce-real-life-1-container',
  template: `
    renders: {{ rerenders() }}
    <button [unpatch] (click)="updateObject()">update</button>
    <coalesce-real-life-1> </coalesce-real-life-1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class RealLife1ContainerComponent implements OnInit {
  numRenders = 0;
  strategies: StrategySelection<any>;
  obj = {
    name: 'test',
    age: 42,
    items: [1, 2, 3, 4, 5]
  };

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.strategies = getStrategies({ scope: this.scope });
  }

  updateObject() {
    this.obj.name = 'name' + Math.random();
    // tslint:disable-next-line:no-bitwise
    this.obj.age = ~~(Math.random() * 10);
    this.obj.items = [
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    ];
    this.strategies['local'].scheduleCD();
  }

  rerenders() {
    return ++this.numRenders;
  }
}

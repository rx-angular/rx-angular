import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { getStrategies } from '@rx-angular/template';

@Component({
  selector: 'coalesce-real-life-1',
  template: `
    renders: {{ rerenders() }}
    <button [unpatch] (click)="updateObject()">update</button>
    <h1>{{ _name }}</h1>
    <p>{{ _age }}</p>
    <ul>
      <li *ngFor="let item of _items">{{ item }}</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RealLife1Component implements OnInit {
  numRenders = 0;
  strategy = 'localNative';
  strategies;

  _name = '';
  set name(name: string) {
    this._name = name;
    this.strategies[this.strategy].scheduleCD();
  }

  _age = 0;
  set age(age: number) {
    this._age = age;
    this.strategies[this.strategy].scheduleCD();
  }

  _items: number[] = [];
  set items(items: number[]) {
    this._items = items;
    this.strategies[this.strategy].scheduleCD();
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.strategies = getStrategies({ cdRef: this.cdRef });
  }

  updateObject() {
    this.name = 'name' + Math.random();
    // tslint:disable-next-line:no-bitwise
    this.age = ~~(Math.random() * 10);
    this.items = [Math.random(), Math.random(), Math.random(), Math.random()];
  }

  rerenders() {
    return ++this.numRenders;
  }
}

import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { defer, ReplaySubject, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ArrayProviderComponent
} from '../../../../shared/debug-helper/value-provider/array-provider/array-provider.component';
import { TestItem } from '../../../../shared/debug-helper/value-provider/index';

@Component({
  selector: 'rxa-virtual-for-test',
  template: `
    <div class="container">
      <div class="d-flex">
        <rxa-array-provider
          [unpatched]="[]"
          [buttons]="true"
        ></rxa-array-provider>
      </div>
      <h2 class="mat-subheading-1">*rxVirtualFor</h2>
      <rxa-virtual-for-viewport class="viewport">
        <div
          *rxVirtualFor="let item of data$; trackBy: trackItem"
          class="item">
          {{ item.content }}
        </div>
      </rxa-virtual-for-viewport>
    </div>
  `,
  styles: [`
    :host {
    }
    .viewport {
      height: 350px;
    }
    .item {
      width: 250px;
      padding: 10px 0;
      box-shadow: 1px 1px 1px 1px rgba(0,0,0, .13);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualForTestComponent implements OnInit, AfterViewInit {

  @ViewChild(ArrayProviderComponent)
  arrayProvider: ArrayProviderComponent;

  private readonly afterViewInit$ = new ReplaySubject<void>(1);

  data$ = defer(() => this.afterViewInit$.pipe(
    switchMap(() => this.arrayProvider.array$.pipe(
      map(values => values.map(item => ({
        ...item,
        content: this.randomContent()
      })))
    ))
  ))

  randomContent = () => {
    return new Array(Math.max(1, Math.floor(Math.random() * 25))).fill('').map(() => this.randomWord())
      .join(' ');
  }

  randomWord = () => {
    const words = ['Apple','Banana','The','Orange','House','Boat','Lake','Car','And'];
    return words[Math.floor(Math.random() * words.length)];
  }

  trackItem = (idx: number, item: TestItem): number => item.id;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.afterViewInit$.next();
  }
}

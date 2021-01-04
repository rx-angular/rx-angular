import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { renderOnChange } from '../../../../rx-angular-pocs/cdk/decorators/stateful';
import { ArrayProviderComponent } from '../../../../shared/debug-helper/value-provider/array-provider/array-provider.component';

interface Sibling { id: number; color: string }

@Component({
  selector: 'rxa-stateful',
  template: `
    <rxa-visualizer>
      <div visualizerHeader class="row">
        <div class="col-sm-12">
          <h2>RxFor with static values</h2>
          <rxa-array-provider
            [unpatched]=""
            [buttons]="true"
            #arrayP="rxaArrayProvider"
          ></rxa-array-provider>
        </div>
      </div>
      <div class="d-flex flex-wrap w-100">
        <div
          class="sibling"
          [ngStyle]="{ background: a.color }"
          *rxFor="let a of siblings; let index = index; trackBy: trackSibling"
        >
        </div>
      </div>
    </rxa-visualizer>
  `,
  styles: [
    `
      .sibling {
        position: relative;
        width: 8px;
        height: 8px;
        margin: 0 2px 2px 0;
        padding: 0px;

        outline: 1px solid mistyrose;
        background-color: transparent;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatefulComponent implements OnInit, AfterViewInit {

  test: string;
  siblings: Sibling[];

  @ViewChild(ArrayProviderComponent) dataService: ArrayProviderComponent;

  constructor(private cdRef: ChangeDetectorRef) {
    renderOnChange(this, ['siblings'], {
      cdRef
    });
  }

  trackSibling(i: number, s: { id: number; color: string }) {
    return s.id;
  }

  ngOnInit(): void {
    this.test = 'test';
    // this.siblings = [];
  }

  ngAfterViewInit() {
    this.dataService.array$.subscribe(arr => {
      this.siblings = arr.map(sibling => ({
        ...sibling,
        color: this.color(sibling.value)
      }));
    })
  }

  color(a) {
    return '#' +Math.floor(a*16777215).toString(16);
  }

  update(): void {
    this.test = (Math.random() * 1000).toString();
  }
}

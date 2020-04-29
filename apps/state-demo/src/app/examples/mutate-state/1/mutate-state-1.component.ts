import { ChangeDetectionStrategy, Component } from '@angular/core';

import { interval } from 'rxjs';
import { DemoBasicsItem } from '../mutate-state-item.interface';

import { map } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';

interface ComponentState {
  refreshInterval: number;
  list: DemoBasicsItem[];
  listExpanded: boolean;
}

const initComponentState = {
  refreshInterval: 10000,
  listExpanded: false,
  list: []
};

@Component({
  selector: 'mutate-state-1',
  template: `
    <h3>Demo Basic 1 - Setup and Retrieving State</h3>
    <small>Child rerenders: {{ rerenders() }}</small
    ><br />
    <mat-card *rxLet="select(); let vm">
      <mat-card-header class="list">
        <mat-progress-bar *ngIf="false" [mode]="'query'"></mat-progress-bar>
        <mat-card-title>List</mat-card-title>
        <mat-card-description>Headline</mat-card-description>
      </mat-card-header>

      <button mat-raised-button color="primary">
        Refresh List
      </button>

      <ng-container>
        <div *ngIf="vm.list?.length; else noList">
          <mat-list>
            <mat-list-item *ngFor="let item of vm.list">
              {{ item.name }}
            </mat-list-item>
          </mat-list>
        </div>
      </ng-container>

      <ng-template #noList>
        <mat-card>No list given!</mat-card>
      </ng-template>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MutateState1Component1 extends RxState<{
  list: [{ id: any; [key: string]: any }];
}> {
  numRenders = 0;

  rerenders(): number {
    return ++this.numRenders;
  }

  constructor() {
    super();
    this.set({ list: [{ id: '1', name: 'name' }] });

    this.connect(
      interval(1000).pipe(
        map(() => ({
          // tslint:disable-next-line:no-bitwise
          id: ~~(Math.random() * 100),
          name: 'name' + Math.random()
        }))
      ),
      ({ list }, obj) => {
        const idx = list.findIndex(i => i.id === obj.id);
        if (idx) {
        }
        return { list };
      }
    );
  }
}

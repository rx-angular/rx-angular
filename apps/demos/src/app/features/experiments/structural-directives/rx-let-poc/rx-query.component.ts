import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StrategyProvider } from '../../../../shared/rx-angular-pocs/render-stragegies/strategy-provider.service';
import { RickAndMortyService } from './rick-and-morty.service';
import { query } from 'rx-query';
import { Observable, Subject } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';

@Component({
  selector: 'rxa-rx-query',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <rxa-strategy-select (strategyChange)="strategyProvider.primaryStrategy = $event">
        </rxa-strategy-select>
        <br/>
        <mat-form-field>
          <label>Search</label>
          <input #i matInput type="text" (input)="search$.next(i.value)">
        </mat-form-field>
      </div>
      <div class="mt-5 row w-100 d-flex">
        <div class="col-6 dh-embedded-view p-2">
          <div *rxLetTriggered="charactersQueryResult$; let qr;">
            <p>qr.status: {{qr.status}}</p>
            <p>qr.data: {{qr?.data?.results?.length}}</p>
            <p>qr.error: {{qr?.error?.message}}</p>
            <p>qr.retries: {{qr?.retries}}</p>
          </div>

          <div *rxLetTriggered="characters$; let characters;
            let mode = rxSuspense;
            suspenseTrigger: suspense$;
            errorTrigger: error$">
            <mat-progress-bar *ngIf="mode" [mode]="mode"></mat-progress-bar>
            <ul>
              <li *ngFor="let character of characters">
                <a [routerLink]="character.id">{{ character.name }}</a>
              </li>
            </ul>
          </div>
          <!-- Templates -->
          <ng-template>
            <rxa-list-item-ghost></rxa-list-item-ghost>
          </ng-template>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'm-1 p-1',
    style: 'display: block;'
  },
  providers: [StrategyProvider]
})
export class RxQueryComponent {
  search$ = new Subject<string>();
  charactersQueryResult$: Observable<any> = query(
    'character',
    this.search$,
    (search: string) => this.service.getCharacter({ name: search })
  );

  rxQueryStatusToMaterialProgressbarMode = {
    'loading': 'query',
    'refreshing': 'buffer'
  };
  suspense$ = this.charactersQueryResult$.pipe(pluck('status'), map(s => this.rxQueryStatusToMaterialProgressbarMode[s]), filter(s => !!s));
  characters$ = this.charactersQueryResult$.pipe(map(res => res?.data?.results), filter(v => !!v));
  error$ = this.charactersQueryResult$.pipe(map(res => res?.error), filter(v => !!v));

  constructor(public strategyProvider: StrategyProvider,
              public service: RickAndMortyService) {
  }

}

import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { merge, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { immutableArr, immutableIncArr } from '../utils';

@Component({
  selector: 'app-cd-embedded-view-parent03',
  template: `
    <h2>
      CD EmbeddedView 03
      <renders></renders>
    </h2>

    <button mat-raised-button (click)="trackById({})">
      CD
    </button>
    <button mat-raised-button [unpatch] (click)="changeOneClick$.next(1)">
      add
    </button>
    <button mat-raised-button [unpatch] (click)="changeOneClick$.next(0)">
      update
    </button>
    <button mat-raised-button [unpatch] (click)="changeOneClick$.next(-1)">
      remove
    </button>

    <button mat-raised-button [unpatch] (click)="changeAllClick$.next(10)">
      Change all
    </button>

    <div class="row">
      <div class="col">
        <h3>Native Angular</h3>
        <ng-container *ngFor="let i of array$ | async; trackBy: trackById">
          <renders></renders>
          -
          <mat-icon>{{i.value ? 'check' : 'highlight_off'}}</mat-icon>
          <br/>
        </ng-container>
      </div>
      <div class="col">
        <h3>rxFor - push based</h3>
        <ng-container *poc1For="array$; let i; trackBy: 'id'">
          <renders></renders>
          -
          <mat-icon>{{i.value ? 'check' : 'highlight_off'}}</mat-icon>
          <br/>
        </ng-container>
      </div>
      <div class="col">
        <h3>rxFor - trackBy</h3>
        <ng-container *poc2For="array$; let i; trackBy: 'id'">
          <renders></renders>
          -
          <mat-icon>{{i.value ? 'check' : 'highlight_off'}}</mat-icon>
          <br/>
        </ng-container>
      </div>
      <div class="col">
        <h3>rxFor - trackBy, distinctBy</h3>
        <ng-container *poc2For="array$; let i; trackBy: 'id'; distinctBy: distinctBy">
          <renders></renders>
          -
          <mat-icon>{{i.value ? 'check' : 'highlight_off'}}</mat-icon>
          <br/>
        </ng-container>
      </div>
      <div class="col">
        <h3>rxFor - iterable, trackByFn</h3>
        <ng-container *pocForIterable="array$; let i; trackBy: trackById">
          <renders></renders>
          -
          <mat-icon>{{i.value ? 'check' : 'highlight_off'}}</mat-icon>
          <br/>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .row {
      display: flex;
    }

    .col {
      width: 25%;
    }

  `],
  changeDetection: environment.changeDetection
})
export class CdEmbeddedViewParent03Component {
  changeOneClick$ = new Subject<number>();
  changeAllClick$ = new Subject<number>();

  array$ = merge(
    this.changeOneClick$.pipe(immutableIncArr()),
    this.changeAllClick$.pipe(immutableArr())
  ).pipe(
    share()
  );

  trackById = i => i.id;
  distinctBy = (a, b) => a.value === b.value;
}

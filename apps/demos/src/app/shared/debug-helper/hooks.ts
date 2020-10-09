import { AfterViewInit, Injectable, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable()
export abstract class Hooks implements OnDestroy, AfterViewInit, OnChanges {
  afterViewInit$ = new ReplaySubject(1);
  onChanges$ = new Subject();
  onDestroy$ = new ReplaySubject(1);

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges$.next();
  }

  ngAfterViewInit(): void {
    this.afterViewInit$.next();
    this.afterViewInit$.complete();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();

    this.onChanges$.complete();
    this.afterViewInit$.complete();
    this.onDestroy$.complete();
  }

}

import { AfterViewInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

export class Hooks implements OnDestroy, AfterViewInit, OnChanges {
  afterViewInit$ = new Subject();
  onChanges$ = new Subject();
  onDestroy$ = new Subject();

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

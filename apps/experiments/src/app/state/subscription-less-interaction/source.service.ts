import { Injectable, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  values = new Subject();
  $ = this.values.asObservable();

  constructor() {
    timer(0, 1000).subscribe(n => {
      console.log('change');
      this.values.next(n);
    });
  }
}

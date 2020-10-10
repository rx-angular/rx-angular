import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  values = new Subject();
  $ = this.values.asObservable();

  constructor() {
    timer(0, 1000).subscribe((n) => {
      console.log('change');
      this.values.next(n);
    });
  }
}

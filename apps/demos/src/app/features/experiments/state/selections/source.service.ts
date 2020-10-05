import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  $ = timer(0, 1000);
}

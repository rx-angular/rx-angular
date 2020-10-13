import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
export function toInt(base: number = 10) {
  return (o$: Observable<any>): Observable<number> => o$.pipe(
    map(v => parseInt(v, base))
  );
}

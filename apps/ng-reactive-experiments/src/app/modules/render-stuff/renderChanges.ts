import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {CdStrategy} from './strategy';
import {tap} from 'rxjs/operators';

export function renderChanges<T>(strategy: CdStrategy<T>): MonoTypeOperatorFunction<T> {
    return (s: Observable<T>): Observable<T> => {
        return s.pipe(
            strategy.behaviour(),
            tap(() => strategy.render())
        );
    };
}

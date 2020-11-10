import { Observable, pipe, UnaryFunction } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PaginatedPokemon } from '../models/pokemon.model';

export function toApiResponse(
  initialValue: PaginatedPokemon
): UnaryFunction<
  Observable<PaginatedPokemon>,
  Observable<{ status: 'loading' | 'success'; data: PaginatedPokemon }>
> {
  return pipe(
    map((data: PaginatedPokemon) => ({ status: 'success' as const, data })),
    startWith({ status: 'loading' as const, data: initialValue })
  );
}

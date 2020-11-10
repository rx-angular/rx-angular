import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PaginatedPokemon } from '../models/pokemon.model';
import { toApiResponse } from '../utils/to-api-response.util';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Call PokemonAPI to fetch for Pokemon based on current limit and offset
   *
   * @param limit
   * @param offset
   * @param prev - We pass in the previous data so we can still display the data while showing the loading on fetching new data
   */
  getPokemon(
    limit: number = 20,
    offset: number = 0,
    prev: PaginatedPokemon
  ): Observable<{ status: 'loading' | 'success'; data: PaginatedPokemon }> {
    const params = {
      limit: limit.toString(),
      offset: offset.toString(),
    };

    return this.httpClient
      .get<PaginatedPokemon>('https://pokeapi.co/api/v2/pokemon', { params })
      .pipe(
        delay(1500), // delay 1.5s to simulate fetching data
        toApiResponse(prev) // transform PaginatedPokemon to { status, data: PaginatedPokemon }
      );
  }
}

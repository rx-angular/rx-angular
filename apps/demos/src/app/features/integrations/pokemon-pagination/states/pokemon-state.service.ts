import { Injectable } from '@angular/core';
import { selectSlice } from '@rx-angular/cdk/state';
import { RxState } from '@rx-angular/state/state';
import { combineLatest } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

export interface PokemonState {
  status: 'loading' | 'success';
  total: number;
  originalResult: Pokemon[];
  filteredResult: Pokemon[];
  limit: number;
  offset: number;
  currentPage: number;
  query: string;
}

@Injectable()
export class PokemonStateService extends RxState<PokemonState> {
  /**
   * Construct the ViewModel that the Presentation Layer will use
   */
  readonly vm$ = this.select(
    selectSlice([
      'status',
      'filteredResult',
      'currentPage',
      'total',
      'limit',
      'offset',
    ])
  );

  constructor(private readonly pokemonService: PokemonService) {
    super();
    /**
     * Set the initial value for these.
     */
    this.set({
      currentPage: 1,
      limit: 20,
      offset: 0,
      query: '',
      filteredResult: [],
      originalResult: [],
      total: 0,
    });

    /**
     * Connect the main effect$ (fetching data based on limit$ and offset$ changed) to the State
     */
    this.connect(this.effect$());

    /**
     * Connect the queryEffect$ (client-side text filter) to filteredResult
     */
    this.connect('filteredResult', this.queryEffect$());
  }

  private effect$() {
    return combineLatest([this.select('limit'), this.select('offset')]) // combine limit$ and offset$ which effectively watches for changes on these two
      .pipe(
        withLatestFrom(this.select('total'), this.select('originalResult')), // grab the latest values of total$ and originalResult$
        switchMap(
          (
            [[limit, offset], total, original] // switch to getPokemon to fetch the pokemon with the new limit and offset
          ) =>
            this.pokemonService.getPokemon(limit, offset, {
              count: total,
              next: '',
              previous: '',
              results: original,
            }) // total and original helps to construct the prev data
        ),
        map(({ status, data }) => ({
          // transform data returned by service to the shape of our State
          status,
          total: data.count,
          filteredResult: data.results,
          originalResult: data.results,
        }))
      );
  }

  private queryEffect$() {
    return this.select('query') // watch for query changed
      .pipe(
        withLatestFrom(this.select('originalResult')), // grab latest value from originalResult$
        map(([query, data]) => (!query ? data : this.filter(data, query))) // check condition and call filter if needed
      );
  }

  private filter(data: Pokemon[], query: string): Pokemon[] {
    return data.filter((res) =>
      res.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}

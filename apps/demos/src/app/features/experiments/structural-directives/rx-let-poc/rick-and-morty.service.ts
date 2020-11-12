import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  constructor(private http: HttpClient) {}

  getCharacters(search: string) {
    return this.http.get('https://rickandmortyapi.com/api/character');
  }

  getCharacter(params: {characterId?: string, name?: string}) {
    return this.http.get(
      'https://rickandmortyapi.com/api/character/', {params}
    );
  }
}

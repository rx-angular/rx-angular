import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { debounceTime } from 'rxjs/operators';
import { PokemonStateService } from './states/pokemon-state.service';

@Component({
  selector: 'rxa-pokemon',
  template: `
    <ng-container *rxLet="vm$; let vm">
      <mat-paginator
        [pageSizeOptions]="[10, 20, 40, 80]"
        (page)="onPage($event)"
        [pageSize]="vm.limit"
        [length]="vm.total"
        [showFirstLastButtons]="true"
      ></mat-paginator>
      <mat-form-field>
        <mat-label>Filter Pokemon</mat-label>
        <input
          matInput
          placeholder="Filter on the current page..."
          [formControl]="query"
        />
      </mat-form-field>
      <table
        mat-table
        [dataSource]="vm.filteredResult"
        [class.overlay]="vm.status === 'loading'"
      >
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let pokemon">{{ pokemon.name }}</td>
        </ng-container>

        <ng-container matColumnDef="url">
          <th mat-header-cell *matHeaderCellDef>Detail URL</th>
          <td mat-cell *matCellDef="let pokemon">
            <a [href]="pokemon.url" target="_blank">{{ pokemon.url }}</a>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="['name', 'url']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['name', 'url']"></tr>
      </table>
      <mat-spinner
        *ngIf="vm.status === 'loading'"
        mode="indeterminate"
        color="primary"
      ></mat-spinner>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }

      table {
        width: 100%;
        text-align: center;
      }

      th.mat-header-cell {
        text-align: center;
      }

      mat-form-field {
        width: 50%;
      }

      .overlay {
        position: relative;
      }

      .overlay::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.3);
      }

      mat-spinner {
        position: absolute;
        top: 25%;
        right: 50%;
      }

      a {
        color: deeppink;
      }
    `,
  ],
  providers: [PokemonStateService], // provide StateService at the Component level
})
export class PokemonComponent {
  vm$ = this.pokemonStateService.vm$;
  query = new UntypedFormControl();

  constructor(private readonly pokemonStateService: PokemonStateService) {
    /**
     * Connect the FormControl.valueChanges to 'query' state so state.query can be updated reactively
     */
    this.pokemonStateService.connect(
      'query',
      this.query.valueChanges.pipe(debounceTime(250)) // debounce the query changes by 250ms
    );
  }

  onPage({ pageIndex, pageSize }: PageEvent) {
    /**
     * Here, we use RxState.set instead of RxState.connect to update our pagination state.
     * This is the main trigger for the main effect$
     */
    this.pokemonStateService.set({
      currentPage: pageIndex + 1,
      limit: pageSize,
      offset: pageIndex === 0 ? 0 : pageSize * pageIndex,
    });

    /**
     * Reset query on page changed
     */
    this.query.setValue('');
  }
}

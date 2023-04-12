import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { ROUTES } from './pokemon-pagination.routes';
import { PokemonComponent } from './pokemon.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LetModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  declarations: [PokemonComponent],
})
export class PokemonPaginationModule {}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
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

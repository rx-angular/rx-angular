import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { PokemonComponent } from './pokemon.component';
import { ROUTES } from './pokemon-pagination.routes';

@NgModule({
  declarations: [PokemonComponent],
  imports: [
    CommonModule,
    RxLet,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())],
})
export class PokemonPaginationModule {}

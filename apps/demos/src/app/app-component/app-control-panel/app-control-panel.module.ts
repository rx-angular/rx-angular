import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppControlPanelComponent } from './app-control-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { LetModule } from '@rx-angular/template/let';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StrategySelectModule } from '../../shared/debug-helper/strategy-select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [AppControlPanelComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    LetModule,
    MatListModule,
    MatCheckboxModule,
    StrategySelectModule,
    MatSlideToggleModule
  ],
  exports: [AppControlPanelComponent]
})
export class AppControlPanelModule { }

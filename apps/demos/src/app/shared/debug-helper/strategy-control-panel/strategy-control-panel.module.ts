import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrategyControlPanelComponent } from './strategy-control-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { LetModule } from '@rx-angular/template';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [StrategyControlPanelComponent],
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
    MatCheckboxModule
  ],
  exports: [StrategyControlPanelComponent]
})
export class StrategyControlPanelModule { }

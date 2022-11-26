import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppControlPanelComponent } from './app-control-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { LetModule } from '@rx-angular/template/let';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { StrategySelectModule } from '../../shared/debug-helper/strategy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';

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
    MatSlideToggleModule,
  ],
  exports: [AppControlPanelComponent],
})
export class AppControlPanelModule {}

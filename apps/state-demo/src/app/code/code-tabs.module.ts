import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeTabsComponent } from './code-tabs.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CodeModule } from './code.module';

@NgModule({
  imports: [CommonModule, MatCardModule, MatTabsModule, CodeModule],
  declarations: [CodeTabsComponent],
  exports: [CodeTabsComponent],
  entryComponents: [CodeTabsComponent]
})
export class CodeTabsModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeExampleComponent } from './code-example.component';
import { CodeModule } from './code.module';

@NgModule({
  imports: [CommonModule, CodeModule],
  declarations: [CodeExampleComponent],
  exports: [CodeExampleComponent],
  entryComponents: [CodeExampleComponent]
})
export class CodeExampleModule {

}

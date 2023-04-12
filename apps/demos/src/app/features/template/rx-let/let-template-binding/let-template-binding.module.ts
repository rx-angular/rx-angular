import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './let-template-binding.routes';
import { LetTemplateBindingComponent } from './let-template-binding.component';
import { LetTemplateBindingHttpExampleComponent } from './examples/let-template-binding-http-example.component';
import { LetTemplateBindingSubjectExampleComponent } from './examples/let-template-binding-subject-example.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { PushModule } from '@rx-angular/template/push';
import { LetModule } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { MatBadgeModule } from '@angular/material/badge';
import { ToStringPipe } from './to-string.pipe';

const DECLARATIONS = [
  ToStringPipe,
  LetTemplateBindingComponent,
  LetTemplateBindingHttpExampleComponent,
  LetTemplateBindingSubjectExampleComponent,
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UnpatchModule,
    PushModule,
    MatBadgeModule,
    LetModule,
  ],
})
export class LetTemplateBindingModule {}

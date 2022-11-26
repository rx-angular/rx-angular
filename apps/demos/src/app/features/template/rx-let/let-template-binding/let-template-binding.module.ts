import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { LetTemplateBindingHttpExampleComponent } from './examples/let-template-binding-http-example.component';
import { LetTemplateBindingSubjectExampleComponent } from './examples/let-template-binding-subject-example.component';
import { LetTemplateBindingComponent } from './let-template-binding.component';
import { ROUTES } from './let-template-binding.routes';
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

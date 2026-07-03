import { Component } from '@angular/core';
import { DocsLinkComponent } from '../../../../shared/docs-link';
import { LetTemplateBindingHttpExampleComponent } from './examples/let-template-binding-http-example.component';
import { LetTemplateBindingSignalExampleComponent } from './examples/let-template-binding-signal-example.component';
import { LetTemplateBindingSubjectExampleComponent } from './examples/let-template-binding-subject-example.component';

@Component({
  selector: 'rxa-let-template-binding',
  standalone: true,
  imports: [
    DocsLinkComponent,
    LetTemplateBindingSignalExampleComponent,
    LetTemplateBindingSubjectExampleComponent,
    LetTemplateBindingHttpExampleComponent,
  ],
  template: `
    <header class="rxa-demo-header">
      <div>
        <h2>*rxLet — Template Binding</h2>
        <p class="rxa-demo-subtitle">
          Bind <code>*rxLet</code> to a signal, a subject and an HTTP stream.
        </p>
      </div>
      <rxa-docs-link
        docs="template/rx-let-directive"
        source="apps/demos/src/app/features/template/rx-let"
      />
    </header>
    <rxa-let-template-binding-signal-example />
    <rxa-let-template-binding-subject-example />
    <rxa-let-template-binding-http-example />
  `,
})
export class LetTemplateBindingComponent {}

## Install

`npm install --save @rx-angular/template`  
or  
`yarn add @rx-angular/template`

## Usage

Importing `TemplateModule` to your Module (includes push, \*rxLet, unpatch).

```typescript
import { TemplateModule } from '@rx-angular/template';

@NgModule({
  declarations: [...],
  imports: [TemplateModule],
})
export class MyModule {}
```

Alternatively, you can import each feature module individually.

```typescript
import { LetModule, PushModule, ViewportPrioModule } from '@rx-angular/template';

@NgModule({
  declarations: [...],
  imports: [LetModule, PushModule, ViewportPrioModule],
})
export class MyModule {}
```

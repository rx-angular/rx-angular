# no-explicit-change-detection-apis

> Detects all explicit calls of change detection APIs.

## Rationale

Usage of explicit change detection APIs may cause performance issues and indicates that in some cases code does not allow the framework to do its job properly.

## Examples

<details>
<summary>❌ Examples of incorrect code for this rule</summary>

```ts
@Component({
  template: '<div>{{ data }}</div>',
})
class NotOkDetectChangesComponent {
  data: TData;

  constructor(service: SomeService, cdRef: ChangeDetectorRef) {
    service.getData().subscribe((data) => {
      this.data = data;
      cdRef.detectChanges();
    });
  }
}
```

```ts
@Component({
  template: '<div>{{ data }}</div>',
})
class NotOkMarkForCheckComponent {
  data: TData;

  constructor(private service: SomeService, private cdRef: ChangeDetectorRef) {
    this.service.getData().subscribe((data) => {
      this.data = data;
      this.cdRef.markForCheck();
    });
  }
}
```

```ts
@Component({
  template: '<div>{{ data }}</div>',
})
class NotOkIvyDetectChangesComponent {
  data: TData;

  constructor(service: SomeService, cdRef: ChangeDetectorRef) {
    service.getData().subscribe((data) => {
      this.data = data;
      ɵdetectChanges();
    });
  }
}
```

```ts
@Component({
  template: '<div>{{ data }}</div>',
})
class NotOkIvyMarkDirtyComponent {
  data: TData;

  constructor(service: SomeService, cdRef: ChangeDetectorRef) {
    service.getData().subscribe((data) => {
      this.data = data;
      ɵmarkDirty();
    });
  }
}
```

</details>

<br />

<details>
<summary>✅ Examples of correct code for this rule</summary>

```ts
@Component({
  template: '<div>{{ data$ | async }}</div>',
})
class OkComponent {
  readonly data$: Observable<any>;

  constructor(service: SomeService) {
    data$ = service.getData();
  }
}
```

```ts
@Component({
  template: '<div>{{ data }}</div>',
})
class OkishComponent {
  data: any;

  constructor(service: SomeService) {
    service.getData().subscribe((data) => {
      this.data = data;
    });
  }
}
```

</details>

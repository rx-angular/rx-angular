# Output Property Bindings

**Combining `Output` bindings directly from RxState**

```typescript
@Component({
  selector: 'app-stateful',
  template: `
    <div (click)="onClick($event)">Increment</div>
  `,
  providers: [RxState]
})
export class StatefulComponent {
  @Output() countChange = this.state.select('count');

  constructor(private state: RxState<{ count: number }>) {}

  onClick() {
    this.state.set(({ count }) => {
      count: count++;
    });
  }
}
```

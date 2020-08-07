# Updates based on previous state

Often it is needed to get the previous state to calculate the new one.

```typescript
@Component({
   selector: 'app-stateful',
   template: `<ul>
               <li *ngFor="let item of items$ | async">
                 {{ item }} <button (click)="btnClick$.next(item.id)">remove<button>
               </li>
             </ul>
   `,
   providers: [RxState]
})
export class StatefulComponent {
   readonly items$ = this.select('items');
   readonly btnClick$ = new Subject();

   constructor(private state: RxState<{list: {id: number}}>) {
     this.state.connect(
       this.btnClick$, (state, id) => {
         return {
           ...state,
           list: state.list.filter(i => i.id !== id)
       }
     );
   }
}
```

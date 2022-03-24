# Motivation

![Selections (1)](https://user-images.githubusercontent.com/10064416/152422745-b3d8e094-d0f0-4810-b1b2-5f81fae25938.png)

When managing state you want to maintain a core unit of data. 
This data is then later on distributed to multiple places in your component template (local) or whole app (global). 

We can forward this state to their consumers directly or compute specific derivations (selections) for the core unit.

As an example we could think of the following shape: 

**A list and a list title**
```typescript
interface GlobalModel {
  title: string;
  list: Array<{ id: number, date: Date }>
}
```

This data is consumed in different screens:

**A list of all items sorted by id**
```typescript
interface SelectionScreen1 {
  title: string;
  sortDirection: 'asc' | 'desc' | 'none';
  sortedList: Array<{ id: number }>
}
```

**A list of items filtered by date**
```typescript
interface SelectionScreen2 {
  title: string;
  startingDate: Date;
  filteredList: { id: number }
}
```

The 2 rendered lists are a derivation, a modified version of the core set of items.
One time they are displayed in a sorted order, the other time only filtered subset of the items.

> **Hint:**  
> Derivations are always redundant information of our core data and therefore should not get stored,
> but cached in the derivation logic.

![Selections (2)](https://user-images.githubusercontent.com/10064416/152422803-bfd07ab2-0a6f-4521-836e-b71677e11923.png)

As this process contains a lot of gotchas and possible pitfalls in terms of memory usage and performance this small helper library was created.

# Benefits

![Selections (3)](https://user-images.githubusercontent.com/10064416/152422856-a483a06c-84e0-4067-9eaa-f3bb54a0156d.png)


- Sophisticated set of helpers for any selection problem
- Enables lazy rendering
- Computes only distinct values
- Shares computed result with multiple subscriber
- Select distinct sub-sets
- Select from static values
- Fully tested
- Strongly typed

# Concepts

## Selection composition - lazy vs eager

## Selection composition - functional vs reactive

## Selection setup - Template vs Class

As Observables are cold their resulting stream will only get activated by a subscription.
This leads to a situations called: "the late subscriber problem" or "the early subscriber problem". (LINK)

![Selections (5)](https://user-images.githubusercontent.com/10064416/152422955-cb89d198-1a69-450b-be84-29dd6c8c4fdb.png)


In most cases it's best to go with solving problems on the early subscriber side and be sure we never loose values that should render on the screen.

![Selections (4)](https://user-images.githubusercontent.com/10064416/152422883-0b5f6006-7929-4520-b0b2-79eb61e4eb08.png)

# Usage

## select

`select` is the stand-alone version of the `RxState#select` top level method. It helps to create default selection's from a changing state source.

```typescritp
// emissions: 
// 0.        - no emission ever happened
// 1. {a: 1} - incomplete state leads to `?` pollution in the template
// 2. {a: 1, b: 'a'} - render relevant emission
// 2. {a: 1, b: 'a'} - same instance emisssion 
// 3. {a: 1, b: 'a', c: true} - render irrelevant change
// 4. {a: 1, b: 'b', c: true} - render relevant emission
const model$: Observable<Partial<{a: number, b: string, c: boolean}>>;
``` 
**Problem**
```html
<!-- 

Computes 2 times & Renders 0. ❌; 1. ❌; 2. ✅; 3. ❌; .4 ✅
-->
<div *rxLet="model$; let vm">
    B: {{vm?.b}}
</div>
B: {{(model$ | push)?.b}}
```

### single property short hand
```typescritp
const vm$ = model$.pipe(select('b'));
``` 
```html
<!-- 
Computes 1 time & Renders 2. ✅; .4 ✅
-->
<div *rxLet="model$; let vm">
    B: {{vm.b}}
</div>
B: {{(model$ | push).b}}
```

### single operators
```typescritp
const vm$: Observable<> = model$.pipe(select(map(({b}) => b === 'a')));
``` 
```html
<!-- 
Computes 1 time & Renders 2. ✅; .4 ✅
-->
<div *rxLet="model$; let vm">
    B: {{vm.b}}
</div>
B: {{(model$ | push).b}}
```

## selectSlice

## smosh
  
## distinctUntilSomeChanges

# Advanced derivation architecture

**The problem**

We have the following state sources to manage:
- the list of products received form global state - `Product[]`
- the title of the list including it's number of children computen in the component class - `string`
- the sort direction triggered over a UI element click - `boolean`

A setup of the compoents class based on `RxState` could look like this:

```typescript
@Component({
  selector: 'app-problem',
  template: `
    <ng-container *rxLet="viewModel$; let vm">
      <h1>{{vm.title}} - {{vm.sortDirection}}</h1>
      <ul>
        <li *ngFor="let item of vm.sortedList">{{item}}</li>
      </ul>
    </ng-container>
    `,
  providers: [RxState],
})
export class ProblemComponent {
  
  viewModel$: Observable<ViewModel>; // ???

  constructor(private globalState: GlobalState, private state: RxState<Model>) {
    this.state.connect('title', this.globalState.title$);
    this.state.connect('products', this.globalState.products$);
  }
  
  toggleSort() {
    this.state.set('sort', ({sort}) => !sort))
  }
}

```

In a components template we want to render the the UI for the above explained view model `SelectionScreen1`.

```typescript
interface SelectionScreen1 {
  title: string;
  sortDirection: 'asc' | 'desc' | 'none';
  sortedList: Array<{ id: number }>
}
```

A common implementations looks like this:


```typescript
// template removed for brevity
export class ProblemComponent {
  
  private sortedList$ = this.state.select(
      selectSlice(['sortDirection', 'list']),
      map(() => {
         // sort `list` by `sortDirection` to `sortedList` here
        return sortedList;
      })
  );
  
  viewModel$ = this.state.select(
    selectSlice(['title', 'sortedList', 'sortDirection'])
  )

  //                                                    ❌ BAD: modle viewmodel mix up 👇
  constructor(private globalState: GlobalState, private state: RxState<Model & Pick<ViewModel, 'sortedList'>>) {
    // ...
    
    // ❌ BAD: store derived state 👇
    this.state.connect('sortedList', this.sortedList$);
  }
  
  // ...
}

```

![Selections (6)](https://user-images.githubusercontent.com/10064416/152422999-db8260f0-69e1-4d99-b6ac-b2b1d043b4b7.png)

By removing the sorted list form the state and moving it into the selection  
we can clean up the state's typing and have a nice separation of which data is owned by the component (model) and which data is owned by the template (view model)

```typescript
// template removed for brevity
export class ProblemComponent {
  
  private sortedSlice$ = this.state.select(
      selectSlice(['sortDirection', 'list']),
      map(({list, sortDirection}) => {
        // sort `list` by `sortDirection` to `sortedList` here
        return { sortDirection, sortedList };
      })
  );
  
  // ✔ GOOD: Derive view model from model 👇
  viewModel$ = smosh({ title: this.state.select('title')}, this.sortedSlice$);

  // target API
  viewModel$ = smosh({ 
    prop1: 'prop1', // string
    prop2: prop1$ // Observable<string>
    }, 
    slice1$, // Observable<{prop3: 3}>
    slice2$  // Observable<{prop4: 'four'}>,
    // durationSelector$ (optional)
  );

  
  // ✔ GOOD: Derive view model from model 👇
  viewModel$ = smosh({ 
      title: this.state.select('title'),
      [this.sortedSlice$]
  });



  constructor(private globalState: GlobalState, private state: RxState<Model>) {
    // ...
    
  }
  
  // ...
}

```

![Selections (7)](https://user-images.githubusercontent.com/10064416/152423026-d23326c2-97d5-4bd0-9015-f498c3fc0e55.png)


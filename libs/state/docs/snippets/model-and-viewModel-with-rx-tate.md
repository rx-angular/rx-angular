In this example we will see what is the deifference between Model and ViewModel and show different approaches how Model & ViewModel can be handled using RxState. First we will go with imperative approach and after that make it fully reactive.

# What is what?
### What is Model?
Model is an object or class that holds our data.
### What is ViewModel?
ViewModel is data that is needed in our views.
### What is View?
View is our component template.

# Intial app setup
In this example we will take a look at a simple list app. We will focus on next things:
- `List` component that renders list name, items count and items. List can be open or closed.
- `ListService` is a service that will communicate with our API layer and get list data.

For this example we will skip any additional logic such as routing, error handling etc.

### Interfaces

We have 2 interfaces 
- `IList` that represents the model that we recieving from API 
- `IViewList` represents a model that we actually need in our component template.

```
interface IList {
  id: string;
  name: string;
  items: string[];
}
```
```
interface IViewList {
  name: string;
  items: string[];
  itemsTotal: number;
  isOpen: boolean;
}
```
As you can see they are a bit different. Not all `IList` data needed in the View and at the same time `IViewList` contains some additional properties that are not in the `IList`.

### ListService
```
@Injectable({providedIn: 'root'})
export class ListService {

  constructor(private api: ListApiService) { }

  get(): Observable<IList> {
    return this.api.get();
  }
}
```
### ListComponent
```
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnDestroy {
  private destroy$ = new Subject();
  viewList: IViewList;

  constructor(private listService: ListService) {
    this.listService
      .get(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({items, name}) => {
        this.viewList = {
          name,
          items,
          itemsTotal: items.length,
          isOpen: true,
          buttonLabel: 'Close'
        };
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  toggle(isOpen: boolean) {
    this.viewList.isOpen = isOpen;
    this.viewList.buttonLabel = isOpen ? 'Close' : 'Open';
  }
}
```
Main part here:
- Model that we are getting from our API is different from model that we actually need in the template (View). We need to make additional transformation inside `subscribe()`.

### List template
```
<section>
  <h1>{{viewList.name}} ({{viewList.itemsTotal}})</h1>
  <button (click)="toggle(!viewList.isOpen)">{{viewList.buttonLabel}}</button>
  <ul *ngIf="viewList.isOpen">
    <li *ngFor="let item of viewList.items">{{item}}</li>
  </ul>
</section>
```

# Using RxState to handle Model & ViewModel

Lets take a look at 2 suggestions of handling Model & ViewModel with RxState. 

## Option 1. Holding Model & ViewModel inside of component.
In this example we will get rid of ListService and communicate with our app API layer directly inside of the component.

### List component
```
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends RxState<IList> {
  toggle$ = new Subject<boolean>();

 viewModel$: Observable<IViewList> = combineLatest([
    this.select("name"),
    this.select("items"),
    this.toggle$.pipe(startWith(true))
  ]).pipe(
    map(([name, items, isOpen]) => ({
      name,
      items,
      itemsTotal: items.length,
      isOpen,
      buttonLabel: isOpen ? "Close" : "Open"
    }))
  );

  constructor(private api: ListApiService) {
    super();
    this.connect(this.api.get());
  }
}
```
**Component state**

In this example `List` state is an `IList` model.

**Data initialization**

Since API returns us exact `IList` model we can just connect result of this API call directly to our state like this `this.connect(this.api.get());`.

**Toggling list**

We removed imperative method `toggle()` and created `toggle$` subject instead.

**ViewModel**

Our ViewModel (data that needed in the UI) is `viewModel$` property of the component.

```
 viewModel$: Observable<IViewList> = combineLatest([
    this.select("name"),
    this.select("items"),
    this.toggle$.pipe(startWith(true))
  ]).pipe(
    map(([name, items, isOpen]) => ({
      name,
      items,
      itemsTotal: items.length,
      isOpen,
      buttonLabel: isOpen ? "Close" : "Open"
    })),
    distinctUntilSomeChanged(['itemsTotal', 'isOpen])
  );
```
Here we are using `combineLatest` static method and mapping data to our `IViewList`. In the end `distinctUntilSomeChanged` operator from `@rx-angular/state` applied so data will not reach UI if property 'itemsTotal' or 'isOpen' not changed.

### List template
```
<section *ngIf="viewModel$ | async as vm">
  <h1>{{vm.name}} ({{vm.itemsTotal}})</h1>
  <button (click)="toggle$.next(!vm.isOpen)">{{vm.buttonLabel}}</button>
  <ul *ngIf="vm.isOpen">
    <li *ngFor="let item of vm.items">{{item}}</li>
  </ul>
</section>
```
We are using `async as` syntax on the `<section>` tag. In this way data from our `viewModel$` observable will be accessible everywhere inside our list.

## Option 2. Component state as ViewModel and stateful service.

### List service.
```
@Injectable()
export class ListService extends RxState<IList> {
  constructor(private api: ListApiService) { 
    super();
    this.connect(this.api.get());
  }
}
```
Now `ListService` is a stateful service that will handle list loading, hold our `List` model and serve as a facade for our view.

### List component.
```
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
  providers: [ListService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends RxState<IViewList> {
  // Reads
  name$ = this.select('name');
  itemsTotal$ = this.select('itemsTotal');
  isOpen$ = this.select('isOpen');
  buttonLabel$ = this.select('buttonLabel');
  items$ = this.select('items');

  // Events
  toggle$ = new Subject();

  constructor(private facade: ListService) {
    super();

    this.connect(
      this.facade.select(map(list => ({
        name: list.name,
        items: list.items,
        itemsTotal: list.items.length,
        isOpen: true,
        buttonLabel: "Close"
      })))
    );

    this.connect(this.toggle$, (state, _) => ({
      isOpen: !state.isOpen,
      buttonLabel: !state.isOpen ? "Close" : "Open"
    }));
  }
}
```
**What changed?**

- We made `ListService` a provider of our component. That means that lifecycle of `ListService` & `ListComponent` will be nearly the same. So component & service will be created and destroyed nearly at the same time. This service will be available only for this component and its children.
- Instead of loading list data here we are just connecting data from `ListService`.
- We removed `viewModel$` property from our component. Now component state serves as ViewModel. So all properties will be accessible via `this.select()`.

### List template
```
<section>
  <h1>{{name$ | async}} ({{itemsTotal$ | async}})</h1>
  <button (click)="toggle$.next(null)">{{buttonLabel$ | async}}</button>
  <ul *ngIf="isOpen$ | async">
    <li *ngFor="let item of items$ | async">{{item}}</li>
  </ul>
</section>
```
We are accessing each property separately as an observable and displaying it in the tamplate using `async` pipe.


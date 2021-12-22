# Resources

**Example applications:**  
A demo application is available on [GitHub](https://github.com/BioPhoton/rx-angular-state-actions).

# Motivation

Actions are a common part of state management and reactive systems in general. 
Even if `@rx-angular/state` provides `set` method, sometimes you need to add behaviour to your user input or incomming events.

Subjects are normally used to implement this feature. This leads, especially in bigger applications to messy code that is bloated with Subjects.

Let's have a look at this piece of code:

```typescript
@Component({
template: `
<input (input)="searchInput($event?.target?.value)" /> Search for: {{search$ | async}}<br/>
<button (click)="submitBtn()">Submit<button><br/>
<ul>
  <li *ngFor="let item of list$ | async as list">{{item}}</li>
</ul>
`})
class Component {
  private _submitBtn = new Sunject<void>();
  private _searchInput = new Sunject<string>();
    
  set submitBtn() {
    _submitBtn.next()
  }
  get submitBtn$() {
    return _searchInput.asObservable();
  }
  set search(search: string) {
    _searchInput.next(search)
  }
  get search$() {
    return _searchInput.asObservable();
  }
    
  list$ = this.submitBtn$.pipe(
    withLatestFrom(this.search$),
    switchMap(([_, searchString]) => api.query(searchString))
   )
  
  constructor(api: API) {
  
  }

}
```

Just look at the amount of code we need to write for only 2 observable ui events.

Downsides:
- Boilerplate for setter and getter
- Transformations spreaded over class and template
- Manual typing ov subjects and streams
- no central plae for ui trigger

Imagine we could have configurable functions that return all UI logic typed under one object.

```typescript
import { RxActionsFactory } from './actions.factory'; 
interface UiActions {
 submitBtn: void,
 searchInput: string
}

@Component({
template: `
<input (input)="ui.searchInput($event)" /> Search for: {{ui.search$ | async}}<br/>
<button (click)="ui.submitBtn()">Submit<button><br/>
<ul>
  <li *ngFor="let item of list$ | async as list">{{item}}</li>
</ul>
`,
providers: [RxActionsFactory]
})
class Component {
  ui = factory.create({searchInput: (e) => e?.target?.value});
  
  list$ = this.ui.submitBtn$.pipe(
    withLatestFrom(this.ui.search$),
    switchMap(([_, searchString]) => api.query(searchString))
   )
  
  constructor(api: API,
   private factory: RxActionsFactory<UiActions>
) {
  
  }

}
```

# RxAngular Actions

This package helps to reduce code used to create composable action streams. 
It mostly is used in combination with state management libs to handle user interaction and backend communication.

## Setup

The coalescing features can be used directly from the `cdk` package or indirectly through the `state` package.
To do so, install the `cdk` package and, if needed, the packages depending on it:

1. Install `@rx-angular/state`

```bash
npm i @rx-angular/state
// or
yarn add @rx-angular/state
```

## Usage

As actions are used in global state management as well as in UI event composition we will have a look on both ends.


There are 2 common ways to create an action stream and its emission:
- on Subject multiple filter
- multiple Subjects


**One Subject multiple filter**
```typescript
type commandNames = 'refreshUsers' | 'refreshList' | 'refreshGenres';
interface Command<T extends commandNames, P = any> {
  type: T;
  payload?: P;
}
type refreshUser = Command<'refreshUsers', string | number>;
type refreshList = Command<'refreshList', string | number>;
type refreshGenres = Command<'refreshGenres', string | number>;
type commands = refreshGenres | refreshList | refreshUser;

private commands = new Subject<commands>();

set refreshUser(value: string | number) {
  this._refreshUser.next({refreshUser: value})
}
get refreshUser$(): Observable<string | number> {
  return this.commands.pipe(
    filter(({type} => type === 'refreshUser')
  ).asObservable();
}
set refreshList(value: string | number) {
  this.commands.next({refreshList: value})
}
get refreshList$(): Observable<string | number> {
  return this.commands.pipe(
    filter(({type} => type === 'refreshList')
  ).asObservable();
}
set refreshGenres(value: string | number) {
  this.commands.next({refreshGenres: value})
}
get refreshGenres$(): Observable<string | number> {
  return this.commands.pipe(
    filter(({type} => type === 'refreshGenres')
  ).asObservable();
}
```

**Multiple Subject**
```typescript
private _refreshUser = new Subject<string | number>();
private _refreshList = new Subject<string | number>();
private _refreshGenres = new Subject<string | number>();

set refreshUser(value: string | number) {
  this._refreshUser.next(value)
}
get refreshUser$(): Observable<string | number> {
  return this._refreshUser.asObservable();
}
set refreshList(value: string | number) {
  this._refreshList.next(value)
}
get refreshList$(): Observable<string | number> {
  return this._refreshList.asObservable();
}
set refreshGenres(value: string | number) {
  this._refreshUser.next(value)
}
get refreshGenres$(): Observable<string | number> {
  return this._refreshUser.asObservable();
}
```

Both produce a similar amount of boiler plate and are hard to maintain and type.

By using RxAngular Actions we can reduce the boilerplate significantly:

**RxA - Actions**
```typescript
interface Commands {
  refreshUser: string | number;
  refreshList: string | number;
  refreshGenres: string | number;
}

 commands = getActions<>()<Commands>();
 
 refreshUser = commands.refreshUser(value);
 refreshUser$ = commands.refreshUser$;
 refreshList = commands.refreshList(value);
 refreshList$ = commands.refreshList$;
 refreshGenres = commands.refreshGenres(value);
 refreshGenres$ = commands.refreshGenres$;
```

### Usage for global services

In services it comes in handy to have a minimal typed action system. 
Furthermore, we the still expose setters to trigger actions the imperative way.

```typescript
interface State {
  genres: MovieGenreModel[];
}

interface Commands {
  refreshGenres: string | number;
}


@Injectable({
  providedIn: 'root'
})
export class StateService extends RxState<State> {
  private commands = new RxActionsFactory<Commands>.create();

  genres$ = this.select('genres');

  constructor(private tmdb2Service: Tmdb2Service) {
    super();

    this.connect(
      'genres',
      this.commands.fetchGenres$.pipe(
        exhaustMap(this.tmdb2Service.getGenres)
      )
    );
  }

  refreshGenres(genre: string): void {
    this.commands.fetchGenres(genre);
  }
  
  // Optionally the reactive way
  connectRefreshGenres(genre$: Observable<string>): void {
    this.connect(
      'genres',
      this.commands.fetchGenres$.pipe(
        exhaustMap(this.tmdb2Service.getGenres)
      )
    );
  }

}
```

### Usage for template events

In components/templates we can use the optional `transforms` param to reduce repetitive code in the template.
In addition, we can use it as a shorthand in the template and directly connect to action dispatching in the class.

```typescript
interface UiActions {
 submitBtn: void,
 searchInput: string
}

@Component({
template: `
<input (input)="ui.searchInput($event)" /> Search for: {{ui.search$ | async}}<br/>
<button (click)="ui.submitBtn()">Submit<button><br/>
<ul>
  <li *ngFor="let item of list$ | async as list">{{item}}</li>
</ul>`,
providers: [RxState, RxActionsFactory]
})
class Component {
  ui = factory.create({searchInput: (e) => e?.target?.value});
  list$ = this.state.select('list');
  submittedSearchQuery$ = this.ui.submitBtn$.pipe(
    withLatestFrom(this.ui.search$), 
    map(([_, search]) => search),
    debounceTime(1500)
  );
  
  consotructor(
    private state: RxState<State>,
    private factory: RxActionsFactory<UiActions>,
    globalState: StateService) {
    super(); 
    this.connect('list', this.globalState.refreshGenres$);
    
    this.state.hold(this.submittedSearchQuery$, this.globalState.refreshGenres);
    // Optional reactively:
    // this.globalState.connectRefreshGenres(this.submittedSearchQuery$);
  }
}
```

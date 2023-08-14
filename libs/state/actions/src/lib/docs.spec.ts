import { TestBed } from '@angular/core/testing';
import {
  Component,
  inject,
  Injectable,
  InjectionToken,
  Output,
  Provider,
} from '@angular/core';
import { rxActions } from './rx-actions';
import { eventValue } from './transforms';
import { ActionTransforms } from '@rx-angular/state/actions';
import {
  debounceTime,
  exhaustMap,
  Observable,
  timer,
  map,
  Subject,
  of,
} from 'rxjs';
import { wait } from 'nx-cloud/lib/utilities/waiter';
import { take } from 'rxjs/operators';

// CASE: Usage in component to handle UI interaction ====

// Source code ==========

type ListUi = { searchInput: string };

@Component({
  template: `<input
    name="search"
    (change)="ui.searchInput($event.target.value)"
  />`,
})
class ListComponent {
  ui = rxActions<ListUi>();
  // UI input with applied behaviour
  @Output()
  queryUpdate$ = this.ui.searchInput$.pipe(debounceTime(300));
}

// Test helper code ==========

function getComponent(cfg?: { transformFns?: ActionTransforms<ListUi> }) {
  TestBed.configureTestingModule({
    declarations: [ListComponent],
  });

  const fixture = TestBed.createComponent(ListComponent);
  const component = fixture.componentInstance;

  const searchInputElem: HTMLInputElement = fixture.nativeElement.querySelector(
    'input[name="search"]'
  );
  const searchInputChange = (value: string) => {
    searchInputElem.value = value;
    searchInputElem.dispatchEvent(new Event('change'));
  };

  return { fixture, component, searchInputChange };
}

// Test code ==========

describe('actions in a component', () => {
  it('should emit event if input fires change event', async () => {
    const { component, fixture, searchInputChange } = getComponent();
    const spyEmission = jest.fn((value: ListUi['searchInput']) => void 0);

    component.queryUpdate$.subscribe(spyEmission);
    expect(spyEmission).toBeCalledTimes(0);

    searchInputChange('abc');
    expect(spyEmission).toBeCalledTimes(0); // should debounce emission
    await wait(310);
    expect(spyEmission).toBeCalledTimes(1); // then fire
    expect(spyEmission).toBeCalledWith('abc'); // with value

    fixture.destroy();
    searchInputChange('xyz');
    expect(spyEmission).toBeCalledTimes(1);
  });
});

// CASE: Usage in a service to handle data fetching ====

// Source code =====

type Actions = { refresh: void };
type Movie = Record<string, any>;

@Injectable({ providedIn: 'root' })
export class MovieResource {
  getMovies(): Observable<Movie[]> {
    return of([{ name: 'dummy data' }]);
  }
}

@Injectable({ providedIn: 'root' })
export class MovieResourceMock {
  httpResponse = new Subject<Movie[]>();

  getMovies(): Observable<Movie[]> {
    return this.httpResponse.pipe(take(1));
  }
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private actions = rxActions<Actions>();
  private movieResource = inject(MovieResource);
  // data refresh with applied behaviour
  movies$ = this.actions.refresh$.pipe(
    exhaustMap((_) => this.movieResource.getMovies())
  );

  refresh() {
    this.actions.refresh();
  }
}

// Test helper code ==========

function setupService() {
  TestBed.overrideProvider(MovieResource, {
    useFactory: () => new MovieResourceMock(),
  });

  const service = TestBed.inject(MovieService);
  const resource = TestBed.inject(MovieResource) as MovieResourceMock;
  return { service, resource };
}

// Test code ==========

describe('actions in a service', () => {
  it('should emit event if method is called', async () => {
    const { service, resource } = setupService();
    const spyEmission = jest.fn((value: Movie[]) => void 0);

    service.movies$.subscribe(spyEmission);
    service.refresh();
    service.refresh(); // multiple triggers
    expect(spyEmission).toBeCalledTimes(0); // don't fire new http requests while old one is running
    resource.httpResponse.next([{ title: 'test' }]); // simulate response
    expect(spyEmission).toBeCalledTimes(1); // response arrived 1 time
    expect(spyEmission).toBeCalledWith([{ title: 'test' }]); // with simulated result
  });
});

// CASE: Handling side effects on event emission ====
@Injectable({ providedIn: 'root' })
export class ToastService {
  showSuccess(msg: string): void {}
}

type ListUiEf = { refresh: void };

@Component({
  template: `<button name="refresh" (click)="ui.refresh()">Refresh</button>`,
})
class ListEfComponent {
  protected ui = rxActions<ListUiEf>();
  protected movieResource = inject(MovieResource);
  protected toastService = inject(ToastService);

  private saveObsEf = this.ui.onRefresh(
    (save$) => save$.pipe(exhaustMap((_) => this.movieResource.getMovies())), // apply behaviour
    () => this.toastService.showSuccess('Refresh done!') // fire side effect
  );

  stopListenToClick() {
    this.saveObsEf();
  }
}

// Test helper code ==========

function getEfComponentAndService(cfg?: {
  transformFns?: ActionTransforms<ListUi>;
}) {
  TestBed.configureTestingModule({ declarations: [ListEfComponent] });
  TestBed.overrideProvider(MovieResource, {
    useFactory: () => new MovieResourceMock(),
  });

  const resource = TestBed.inject(MovieResource) as MovieResourceMock;
  const toast = TestBed.inject(ToastService);

  const fixture = TestBed.createComponent(ListEfComponent);
  const component = fixture.componentInstance;

  const refreshButtonElem: HTMLInputElement =
    fixture.nativeElement.querySelector('button');
  const refreshClick = () => {
    refreshButtonElem.dispatchEvent(new Event('click'));
  };

  return { fixture, component, refreshClick, resource, toast };
}

// Test code ==========

describe('action effect in a Service', () => {
  it('should emit event if method is called', async () => {
    const { refreshClick, resource, toast } = getEfComponentAndService();
    const spyToast = jest.spyOn(toast, 'showSuccess');

    refreshClick();
    refreshClick(); // multiple triggers
    expect(spyToast).toBeCalledTimes(0); // don't fire new http requests while old one is running
    resource.httpResponse.next([{ title: 'test' }]);
    expect(spyToast).toBeCalledTimes(1); // response arrived 1 time
    expect(spyToast).toBeCalledWith('Refresh done!'); // with simulated result
  });
});

// Test code ==========

describe('action effect in a Component', () => {
  it('should emit event if method is called', async () => {
    const { refreshClick, resource, toast, component } =
      getEfComponentAndService();
    const spyToast = jest.spyOn(toast, 'showSuccess');

    refreshClick();
    expect(spyToast).toBeCalledTimes(0); // don't fire new http requests while old one is running
    component.stopListenToClick();
    resource.httpResponse.next([{ title: 'test' }]);
    expect(spyToast).toBeCalledTimes(0); // response arrived 1 time
  });
});

// CASE: Transform in a central place =====

const codeTransform = (v) => parseInt(eventValue(v)) + '#POSTFIX';

@Component({
  // takes a DOM Event
  template: `<input name="search" (change)="ui.searchInput($event)" />`,
})
class ListTransformComponent {
  protected ui = rxActions<ListUi>(({ transforms }) =>
    transforms({ searchInput: codeTransform })
  );

  @Output()
  queryUpdate = this.ui.searchInput$;

  searchChange(query: string) {
    // takes a string
    this.ui.searchInput(query);
  }
}

// Test helper code ==========

function getTransformComponentAndService() {
  TestBed.configureTestingModule({ declarations: [ListTransformComponent] });
  const fixture = TestBed.createComponent(ListTransformComponent);
  const component = fixture.componentInstance;

  const searchInputElem: HTMLInputElement = fixture.nativeElement.querySelector(
    'input[name="search"]'
  );
  const searchInputChange = (value: string) => {
    searchInputElem.value = value;
    searchInputElem.dispatchEvent(new Event('change'));
  };

  return { component, searchInputChange };
}

// Test code ==========

describe('action transform in a component', () => {
  it('should emit event if method is called', async () => {
    const { searchInputChange, component } = getTransformComponentAndService();
    const spyEmission = jest.fn(() => void 0);

    component.queryUpdate.subscribe(spyEmission);
    searchInputChange('1.5');
    expect(spyEmission).toBeCalledTimes(1);
    expect(spyEmission).toBeCalledWith('1#POSTFIX');
    component.searchChange('2.5');
    expect(spyEmission).toBeCalledTimes(2);
    expect(spyEmission).toBeCalledWith('2#POSTFIX');
  });
});

import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Component, Inject, inject, Injectable, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { exhaustMap, Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { rxActions } from './rx-actions';

@Injectable()
class AuthService {
  login(credentials: { username: string; password: string }) {
    return of(true);
  }
}

class AuthServiceMock {
  login(credentials: { username: string; password: string }) {
    return of(true);
  }
}

type Movie = Record<string, any>;

// usage in component to handle UI interaction

@Component({
  template: `
    <input placeholder="username" #username />
    <input type="password" placeholder="password" #password />
    <button
      (click)="
        actions.login({
          username: username.value,
          password: password.value
        })
      "
    >
      Login
    </button>
  `,
  standalone: true,
})
class LoginComponent {
  actions = rxActions<{ login: { username: string; password: string } }>();

  constructor(private service: AuthService) {
    this.actions.login$
      .pipe(exhaustMap((credentials) => this.service.login(credentials)))
      .subscribe();
  }
}

describe('usage in component to handle UI interaction', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [AuthService],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    service = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('login on form submit', () => {
    // arrange
    const username = fixture.debugElement.query(By.css('input:first-child'));
    const password = fixture.debugElement.query(
      By.css('input[type="password"]')
    );
    const btn = fixture.debugElement.query(By.css('button'));
    const loginSpy = jest.spyOn(service, 'login');
    username.nativeElement.value = 'user';
    password.nativeElement.value = 'pwd';

    // act
    fixture.detectChanges();
    btn.nativeElement.click();

    // assert
    expect(loginSpy).toHaveBeenCalled();
  });
});

// usage in a service to handle data fetching

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
  private movieResource = inject(MovieResource);
  private actions = rxActions<{ refresh: void }>();
  movies = signal<Movie[]>([]);

  private refreshEffect = this.actions.onRefresh(
    // data refresh with applied behaviour
    (refresh$) =>
      refresh$.pipe(exhaustMap(() => this.movieResource.getMovies())),
    // set the value to the state
    (movies) => this.movies.set(movies)
  );

  refresh() {
    this.actions.refresh();
  }

  disable() {
    this.refreshEffect();
  }
}

describe('usage in a service to handle data fetching', () => {
  let service: MovieService;
  let resource: MovieResourceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService,
        { provide: MovieResource, useClass: MovieResourceMock },
      ],
    }).compileComponents();
    service = TestBed.inject(MovieService);
    resource = TestBed.inject(MovieResource) as any;
  });

  it('should fetch movies on refresh', () => {
    // arrange
    const movies = [{ id: '1' }];
    // act
    service.refresh();
    resource.httpResponse.next(movies);
    // assert
    expect(service.movies()).toEqual(movies);
  });
});

// handling side effects on event emission

@Component({
  template: `
    <input placeholder="username" #username />
    <input type="password" placeholder="password" #password />
    <button
      (click)="
        actions.login({
          username: username.value,
          password: password.value
        })
      "
    >
      Login
    </button>
  `,
  standalone: true,
})
class Login2Component {
  actions = rxActions<{ login: { username: string; password: string } }>();

  private loginEffect = this.actions.onLogin(
    (credentials$) =>
      credentials$.pipe(
        exhaustMap((credentials) => this.service.login(credentials))
      ),
    () => this.doc.defaultView.alert('successfully logged in')
  );
  constructor(
    private service: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}
}

describe('handling side effects on event emission', () => {
  let fixture: ComponentFixture<Login2Component>;
  const documentMock = {
    defaultView: {
      alert: (v) => v,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Login2Component],
      providers: [{ provide: AuthService, useClass: AuthServiceMock }],
    })
      .overrideComponent(Login2Component, {
        set: {
          providers: [
            {
              provide: DOCUMENT,
              useValue: documentMock,
            },
          ],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(Login2Component);
    fixture.detectChanges();
  });

  it('should alert success after login', () => {
    // arrange
    const username = fixture.debugElement.query(By.css('input:first-child'));
    const password = fixture.debugElement.query(
      By.css('input[type="password"]')
    );
    const btn = fixture.debugElement.query(By.css('button'));
    const alertSpy = jest.spyOn(documentMock.defaultView, 'alert');
    username.nativeElement.value = 'user';
    password.nativeElement.value = 'pwd';

    // act
    fixture.detectChanges();
    btn.nativeElement.click();

    // assert
    expect(alertSpy).toHaveBeenCalled();
  });
});

// unsubscribing from events programmatically

describe('unsubscribing from events programmatically', () => {
  let service: MovieService;
  let resource: MovieResourceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService,
        { provide: MovieResource, useClass: MovieResourceMock },
      ],
    }).compileComponents();
    service = TestBed.inject(MovieService);
    resource = TestBed.inject(MovieResource) as any;
  });

  it('should fetching when disabled', () => {
    // arrange
    const movies = [{ id: '1' }];
    service.disable();
    // act
    service.refresh();
    resource.httpResponse.next(movies);
    // assert
    expect(service.movies()).toEqual([]);
  });
});

// transform functions

@Component({
  template: `
    <input name="name" #input (input)="ui.greet(input.value)" />
    <div>{{ ui.greet$ | async }}</div>
  `,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-greet',
  standalone: true,
  imports: [AsyncPipe],
})
class GreetComponent {
  ui = rxActions<{ greet: string }>(({ transforms }) =>
    transforms({
      // highlight-next-line
      greet: (v) => `Hello ${v}`,
    })
  );
}

describe('transform functions', () => {
  let fixture: ComponentFixture<GreetComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GreetComponent],
    });
    fixture = TestBed.createComponent(GreetComponent);
    fixture.detectChanges();
  });

  it('should greet me', () => {
    // arrange
    const input = fixture.debugElement.query(By.css('input'));
    const div = fixture.debugElement.query(By.css('div'));
    input.nativeElement.value = 'me';
    // act
    (input.nativeElement as HTMLInputElement).dispatchEvent(
      new InputEvent('input')
    );
    fixture.detectChanges();
    // assert
    expect(div.nativeElement.textContent.trim()).toBe('Hello me');
  });
});

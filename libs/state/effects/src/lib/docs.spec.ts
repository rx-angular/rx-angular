import { rxEffects } from '@rx-angular/state/effects';
import { Component, inject, Injectable, InjectionToken } from '@angular/core';
import { of, timer } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { wait } from 'nx-cloud/lib/utilities/waiter';

type Movie = {};

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  items = {};
  setItem(prop: string, value: string) {
    this.items[prop] = value;
  }
  removeItem(prop: string) {
    delete this.items[prop];
  }
  getItem(prop: string) {
    return this.items[prop];
  }
}

const BackupInterval = new InjectionToken<number>('BackupInterval');

@Component({
  template: ` <input name="title" [(ngModel)]="movie" />
    <button name="save" (click)="save()">Save</button>`,
  providers: [{ provide: BackupInterval, useValue: 40 }],
})
class ListComponent {
  protected movie = '';
  private backupInterval = inject(BackupInterval);
  private localStorage = inject(LocalStorage);

  private ef = rxEffects(({ register }) => {
    const updateBackup = () =>
      this.localStorage.setItem('editName', this.movie);
    register(timer(0, this.backupInterval), updateBackup);
  });

  save() {
    localStorage.removeItem('editName');
  }

  ngOnInit() {
    this.effects.register(this.util.rotationChanged$, () => {
      console.log('viewport rotation changed');
    });
  }
}

// Test helper code ==========

function setupComponent() {
  TestBed.configureTestingModule({
    declarations: [ListComponent],
    providers: [{ provide: BackupInterval, useValue: 10 }],
  });

  const localStorage = TestBed.inject(LocalStorage);

  const fixture = TestBed.createComponent(ListComponent);
  const component = fixture.componentInstance;

  const searchInputElem: HTMLInputElement = fixture.nativeElement.querySelector(
    'input[name="search"]'
  );
  const searchInputChange = (value: string) => {
    searchInputElem.value = value;
    searchInputElem.dispatchEvent(new Event('change'));
  };

  return { fixture, component, localStorage, searchInputChange };
}

describe('effects usage in a component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should ', async () => {
    const { component, fixture, localStorage, searchInputChange } =
      setupComponent();

    const spySetItem = jest.spyOn(localStorage, 'setItem');
    const spyRemoveItem = jest.spyOn(localStorage, 'removeItem');

    expect(spySetItem).toBeCalledTimes(0);
    await wait(200);
    expect(spySetItem).toBeCalledTimes(1);
    expect(spySetItem).toBeCalledWith('');

    expect(spySetItem).toBeCalledTimes(1);
    expect(spySetItem).toBeCalledWith(1);
  });
});

function setupComponent2() {
  TestBed.configureTestingModule({
    declarations: [ListComponent],
    providers: [{ provide: BackupInterval, useValue: 10 }],
  });

  const localStorage = TestBed.inject(LocalStorage);

  const fixture = TestBed.createComponent(ListComponent);
  const component = fixture.componentInstance;

  const saveButtonElem: HTMLInputElement = fixture.nativeElement.querySelector(
    'button[name="save"]'
  );
  const saveButtonClick = () => {
    saveButtonElem.dispatchEvent(new Event('change'));
  };

  return { fixture, component, localStorage };
}

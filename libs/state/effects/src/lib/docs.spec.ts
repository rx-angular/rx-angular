import { rxEffects } from '@rx-angular/state/effects';
import { Component, inject, Injectable, InjectionToken } from '@angular/core';
import { debounceTime, of, Subject, timer } from 'rxjs';
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

@Component({
  template: ` <input name="title" (change)="change.next(title.value)" #title />
    <button name="save" (click)="save()">Save</button>`,
})
class ListComponent {
  private change = new Subject<string>();
  private localStorage = inject(LocalStorage);

  private ef = rxEffects(({ register }) => {
    const updateBackup = (title) => this.localStorage.setItem('title', title);
    register(this.change.pipe(debounceTime(300)), updateBackup);
  });

  save() {
    localStorage.removeItem('editName');
  }
}

// Test helper code ==========

function setupComponent() {
  TestBed.configureTestingModule({
    declarations: [ListComponent],
  });

  const localStorage = TestBed.inject(LocalStorage);

  const fixture = TestBed.createComponent(ListComponent);
  const component = fixture.componentInstance;

  const searchInputElem: HTMLInputElement = fixture.nativeElement.querySelector(
    'input[name="title"]'
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
    searchInputChange('abc');
    expect(spySetItem).toBeCalledTimes(0); // debounceed
    await wait(350);
    expect(spySetItem).toBeCalledTimes(1);
    expect(spySetItem).toBeCalledWith('title', 'abc');
  });
});

function setupComponent2() {
  TestBed.configureTestingModule({
    declarations: [ListComponent],
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

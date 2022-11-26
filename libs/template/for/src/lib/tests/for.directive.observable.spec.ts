import { CommonModule } from '@angular/common';
import { ErrorHandler } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { Observable } from 'rxjs';
import { ForModule } from '../for.module';
import {
  createErrorHandler,
  createTestComponent as utilCreateTestComponent,
  setThis,
  TestComponent,
  thisArg,
} from './fixtures';

const customErrorHandler: ErrorHandler = {
  handleError: jest.fn(),
};

function createTestComponent(
  template = `<div><span *rxFor="let item of itemsHot$">{{item.toString()}};</span></div>`
) {
  return utilCreateTestComponent(template);
}

describe('rxFor with observables', () => {
  let fixture: ComponentFixture<TestComponent>;
  let errorHandler: ErrorHandler;
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

  function getComponent(): TestComponent {
    return fixture.componentInstance;
  }

  function detectChangesAndExpectText(text: string): void {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toBe(text);
  }

  function expectText(text: string) {
    expect(fixture.nativeElement.textContent).toBe(text);
  }

  afterEach(() => {
    fixture = null as any;
    errorHandler = null as any;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [CommonModule, ForModule],
      providers: [
        {
          provide: ErrorHandler,
          useValue: customErrorHandler,
        },
        {
          provide: RX_RENDER_STRATEGIES_CONFIG,
          useValue: {
            primaryStrategy: 'native',
          },
        },
      ],
    });
    warnSpy.mockClear();
  });

  it('should subscribe only once to the source', waitForAsync(() => {
    fixture = createTestComponent();
    let subscriber = 0;
    const observable = new Observable((observer) => {
      subscriber++;
      observer.next(['1']);
    });
    fixture.componentInstance.itemsHot$ = observable as never;
    detectChangesAndExpectText('1;');
    expect(subscriber).toBe(1);
  }));

  it('should reflect initial elements', waitForAsync(() => {
    fixture = createTestComponent();
    detectChangesAndExpectText('1;2;');
  }));

  it('should reflect added elements', waitForAsync(() => {
    fixture = createTestComponent();
    fixture.detectChanges();
    const newValues = getComponent().itemsHot$.value;
    newValues.push(3);
    getComponent().itemsHot$.next(newValues);
    expectText('1;2;3;');
  }));

  it('should reflect removed elements', waitForAsync(() => {
    fixture = createTestComponent();
    fixture.detectChanges();
    const newValues = getComponent().itemsHot$.value;
    newValues.splice(1, 1);
    getComponent().itemsHot$.next(newValues);
    expectText('1;');
  }));

  it('should reflect moved elements', waitForAsync(() => {
    fixture = createTestComponent();
    fixture.detectChanges();
    const newValues = getComponent().itemsHot$.value;
    newValues.splice(0, 1);
    newValues.push(1);
    getComponent().itemsHot$.next(newValues);
    expectText('2;1;');
  }));

  it('should reflect a mix of all changes (additions/removals/moves)', waitForAsync(() => {
    fixture = createTestComponent();
    fixture.detectChanges();
    getComponent().itemsHot$.next([0, 1, 2, 3, 4, 5]);
    getComponent().itemsHot$.next([6, 2, 7, 0, 4, 8]);

    expectText('6;2;7;0;4;8;');
  }));

  it('should iterate over an array of objects', waitForAsync(() => {
    const template =
      '<ul><li *rxFor="let item of itemsHot$">{{item["name"]}};</li></ul>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    // INIT
    getComponent().itemsHot$.next([{ name: 'misko' }, { name: 'shyam' }]);
    expectText('misko;shyam;');

    // GROW
    const values = getComponent().itemsHot$.value;
    values.push({ name: 'adam' });
    getComponent().itemsHot$.next(values);
    expectText('misko;shyam;adam;');

    // SHRINK
    values.splice(2, 1);
    values.splice(0, 1);
    getComponent().itemsHot$.next(values);
    expectText('shyam;');
  }));

  it('should gracefully handle nulls', waitForAsync(() => {
    const template =
      '<ul><li *rxFor="let item of itemsHot$">{{item}};</li></ul>';
    fixture = createTestComponent(template);
    getComponent().itemsHot$.next(null);
    errorHandler = createErrorHandler();
    fixture.detectChanges();
    const errorSpy = jest.spyOn(errorHandler, 'handleError');

    expectText('');
    expect(errorSpy).toBeCalledTimes(0);
    errorSpy.mockClear();
  }));

  it('should gracefully handle ref changing to null and back', waitForAsync(() => {
    fixture = createTestComponent();
    errorHandler = createErrorHandler();
    const errorSpy = jest.spyOn(errorHandler, 'handleError');

    detectChangesAndExpectText('1;2;');

    getComponent().itemsHot$.next(null);
    expectText('');

    getComponent().itemsHot$.next([1, 2, 3]);
    expectText('1;2;3;');
    expect(errorSpy).toBeCalledTimes(0);
    errorSpy.mockClear();
  }));

  it('should throw on non-iterable ref and suggest using an array', waitForAsync(() => {
    fixture = createTestComponent();
    errorHandler = createErrorHandler();
    const errorSpy = jest.spyOn(errorHandler, 'handleError');
    const expectedError = new Error(
      "NG0901: Cannot find a differ supporting object 'whaaa' of type 'string'"
    );
    getComponent().itemsHot$.next(<any>'whaaa');
    fixture.detectChanges();
    expect(errorSpy).toHaveBeenCalledWith(expectedError);
    errorSpy.mockClear();
  }));

  it('should throw on ref changing to string', waitForAsync(() => {
    fixture = createTestComponent();
    errorHandler = createErrorHandler();
    const errorSpy = jest.spyOn(errorHandler, 'handleError');
    const expectedError = new Error(
      "NG0900: Error trying to diff 'whaaa'. Only arrays and iterables are allowed"
    );
    detectChangesAndExpectText('1;2;');

    getComponent().itemsHot$.next(<any>'whaaa');
    expect(errorSpy).toHaveBeenCalledWith(expectedError);
    errorSpy.mockClear();
  }));

  it('should works with duplicates', waitForAsync(() => {
    fixture = createTestComponent();
    fixture.detectChanges();

    const a = new Foo();
    getComponent().itemsHot$.next([a, a]);
    expectText('foo;foo;');
  }));

  it('should repeat over nested arrays', waitForAsync(() => {
    const template =
      '<div *rxFor="let item of itemsHot$">' +
      '<div *rxFor="let subitem of item">{{subitem}}-{{item.length}};</div>|' +
      '</div>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([['a', 'b'], ['c']]);
    expectText('a-2;b-2;|c-1;|');

    getComponent().itemsHot$.next([['e'], ['f', 'g']]);
    expectText('e-1;|f-2;g-2;|');
  }));

  it('should repeat over nested arrays with no intermediate element', waitForAsync(() => {
    const template =
      '<div *rxFor="let item of itemsHot$">' +
      '<div *rxFor="let subitem of item">{{subitem}}-{{item.length}};</div>' +
      '</div>';
    fixture = createTestComponent(template);
    fixture.detectChanges();
    getComponent().itemsHot$.next([['a', 'b'], ['c']]);
    expectText('a-2;b-2;c-1;');

    getComponent().itemsHot$.next([['e'], ['f', 'g']]);
    expectText('e-1;f-2;g-2;');
  }));

  it('should repeat over nested arrays using select with no intermediate element', waitForAsync(() => {
    const template =
      '<div *rxFor="let item of itemsHot$; let subitems = select">' +
      '<div *rxFor="let subitem of subitems([\'items\']) as col">{{subitem}}-{{col.length}};</div>' +
      '</div>';
    fixture = createTestComponent(template);
    fixture.detectChanges();
    getComponent().itemsHot$.next([{ items: ['a', 'b', 'c'] }]);
    expectText('a-3;b-3;c-3;');

    getComponent().itemsHot$.next([{ items: ['d', 'e', 'f'] }]);
    expectText('d-3;e-3;f-3;');
  }));

  it('should repeat over nested ngIf that are the last node in the rxFor template', waitForAsync(() => {
    const template =
      `<div *rxFor="let item of itemsHot$; let i=index">` +
      `<div>{{i}}|</div>` +
      `<div *ngIf="i % 2 == 0">even|</div>` +
      `</div>`;

    fixture = createTestComponent(template);
    fixture.detectChanges();

    const items = [1];
    getComponent().itemsHot$.next(items);
    expectText('0|even|');

    items.push(1);
    getComponent().itemsHot$.next(items);
    expectText('0|even|1|');

    items.push(1);
    getComponent().itemsHot$.next(items);
    expectText('0|even|1|2|even|');
  }));

  it('should allow of saving the collection', waitForAsync(() => {
    const template =
      '<ul><li *rxFor="let item of itemsHot$ as collection; index as i">{{i}}/{{collection.length}} -' +
      ' {{item}};</li></ul>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    expectText('0/2 - 1;1/2 - 2;');

    getComponent().itemsHot$.next([1, 2, 3]);
    expectText('0/3 - 1;1/3 - 2;2/3 - 3;');
  }));

  it('should display indices correctly', waitForAsync(() => {
    const template =
      '<span *rxFor ="let item of itemsHot$; let i=index">{{i.toString()}}</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expectText('0123456789');

    getComponent().itemsHot$.next([1, 2, 6, 7, 4, 3, 5, 8, 9, 0]);
    expectText('0123456789');
  }));

  it('should display indices$ correctly', waitForAsync(() => {
    const template =
      '<span *rxFor ="let item of itemsHot$; let i=index$">{{(i | async).toString()}}</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expectText('0123456789');

    getComponent().itemsHot$.next([1, 2, 6, 7, 4, 3, 5, 8, 9, 0]);
    expectText('0123456789');
  }));

  it('should display count correctly', waitForAsync(() => {
    const template =
      '<span *rxFor="let item of itemsHot$; let len=count">{{len}}</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([0, 1, 2]);
    expectText('333');

    getComponent().itemsHot$.next([4, 3, 2, 1, 0, -1]);
    expectText('666666');
  }));

  it('should display count$ correctly', waitForAsync(() => {
    const template =
      '<span *rxFor="let item of itemsHot$; let len=count$">{{len | async }}</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([0, 1, 2]);
    expectText('333');

    getComponent().itemsHot$.next([4, 3, 2, 1, 0, -1]);
    expectText('666666');
  }));

  it('should display first item correctly', waitForAsync(() => {
    const template =
      '<span *rxFor="let item of itemsHot$; let isFirst=first">{{isFirst.toString()}}</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([0, 1, 2]);
    expectText('truefalsefalse');

    getComponent().itemsHot$.next([2, 1]);
    expectText('truefalse');
  }));

  it('should display first$ item correctly', waitForAsync(() => {
    const template =
      '<span *rxFor="let item of itemsHot$; let isFirst=first$">{{(isFirst | async).toString()}}</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([0, 1, 2]);
    expectText('truefalsefalse');

    getComponent().itemsHot$.next([2, 1]);
    expectText('truefalse');
  }));

  it('should display last item correctly', waitForAsync(() => {
    const template =
      '<span *rxFor="let item of itemsHot$; let isLast=last">{{isLast.toString()}}</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([0, 1, 2]);
    expectText('falsefalsetrue');

    getComponent().itemsHot$.next([2, 1]);
    expectText('falsetrue');
  }));

  it('should display last item correctly', waitForAsync(() => {
    const template =
      '<span *rxFor="let item of itemsHot$; let isLast=last$">{{(isLast | async ).toString()}}</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([0, 1, 2]);
    expectText('falsefalsetrue');

    getComponent().itemsHot$.next([2, 1]);
    expectText('falsetrue');
  }));

  it('should display even items correctly', waitForAsync(() => {
    const template =
      '<span *rxFor="let item of itemsHot$; let isEven=even">{{isEven.toString()}}</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([0, 1, 2]);
    expectText('truefalsetrue');

    getComponent().itemsHot$.next([2, 1]);
    expectText('truefalse');
  }));

  it('should display even$ items correctly', waitForAsync(() => {
    const template =
      '<span *rxFor="let item of itemsHot$; let isEven=even$">{{(isEven | async).toString()}}</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([0, 1, 2]);
    expectText('truefalsetrue');

    getComponent().itemsHot$.next([2, 1]);
    expectText('truefalse');
  }));

  it('should display odd items correctly', waitForAsync(() => {
    const template =
      '<span *rxFor="let item of itemsHot$; let isOdd=odd">{{isOdd.toString()}}</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([0, 1, 2, 3]);
    expectText('falsetruefalsetrue');

    getComponent().itemsHot$.next([2, 1]);
    expectText('falsetrue');
  }));

  it('should display odd$ items correctly', waitForAsync(() => {
    const template =
      '<span *rxFor="let item of itemsHot$; let isOdd=odd$">{{(isOdd | async).toString()}}</span>';
    fixture = createTestComponent(template);
    fixture.detectChanges();

    getComponent().itemsHot$.next([0, 1, 2, 3]);
    expectText('falsetruefalsetrue');

    getComponent().itemsHot$.next([2, 1]);
    expectText('falsetrue');
  }));

  it('should allow to use a custom template', waitForAsync(() => {
    const template =
      '<ng-container *rxFor="let item of itemsHot$; template: tpl"></ng-container>' +
      '<ng-template let-item let-i="index" #tpl><p>{{i}}: {{item}};</p></ng-template>';
    fixture = createTestComponent(template);
    fixture.detectChanges();
    getComponent().itemsHot$.next(['a', 'b', 'c']);
    expectText('0: a;1: b;2: c;');
  }));

  it('should use a default template if a custom one is null', waitForAsync(() => {
    const template = `<ul><ng-container *rxFor="let item of itemsHot$; template: null; let i=index">{{i}}: {{item}};</ng-container></ul>`;
    fixture = createTestComponent(template);
    fixture.detectChanges();
    getComponent().itemsHot$.next(['a', 'b', 'c']);
    expectText('0: a;1: b;2: c;');
  }));

  it('should use a custom template when both default and a custom one are present', waitForAsync(() => {
    const template =
      '<ng-container *rxFor="let item of itemsHot$; template: tpl">{{i}};</ng-container>' +
      '<ng-template let-item let-i="index" #tpl>{{i}}: {{item}};</ng-template>';
    fixture = createTestComponent(template);
    fixture.detectChanges();
    getComponent().itemsHot$.next(['a', 'b', 'c']);
    expectText('0: a;1: b;2: c;');
  }));

  describe('track by', () => {
    it('should console.warn if trackBy is not a function', waitForAsync(() => {
      const template = `<p *rxFor="let item of itemsHot$; trackBy: value"></p>`;
      fixture = createTestComponent(template);
      fixture.componentInstance.value = 0;
      fixture.detectChanges();
      expect(warnSpy).toBeCalledTimes(1);
    }));

    it('should track by identity when trackBy is to `null` or `undefined`', waitForAsync(() => {
      const template = `<p *rxFor="let item of itemsHot$; trackBy: value">{{ item }}</p>`;
      fixture = createTestComponent(template);
      fixture.componentInstance.itemsHot$.next(['a', 'b', 'c']);
      fixture.componentInstance.value = null;
      detectChangesAndExpectText('abc');
      fixture.componentInstance.value = undefined;
      detectChangesAndExpectText('abc');
      expect(warnSpy).toBeCalledTimes(0);
    }));

    it('should set the context to the component instance', waitForAsync(() => {
      const template = `<p *rxFor="let item of itemsHot$; trackBy: trackByContext.bind(this)"></p>`;
      fixture = createTestComponent(template);

      setThis(null);
      fixture.detectChanges();
      expect(thisArg).toBe(getComponent());
    }));

    it('should not replace tracked items', waitForAsync(() => {
      const template = `<p *rxFor="let item of itemsHot$; trackBy: trackById; let i=index">{{items[i]}}</p>`;
      fixture = createTestComponent(template);
      fixture.detectChanges();

      const buildItemList = () => {
        getComponent().itemsHot$.next([{ id: 'a' }]);
        return fixture.debugElement.queryAll(By.css('p'))[0];
      };

      const firstP = buildItemList();
      const finalP = buildItemList();
      expect(finalP.nativeElement).toBe(firstP.nativeElement);
    }));

    it('should update implicit local variable on view', waitForAsync(() => {
      const template = `<div *rxFor="let item of itemsHot$; trackBy: trackById">{{item['color']}}</div>`;
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHot$.next([{ id: 'a', color: 'blue' }]);
      expectText('blue');

      getComponent().itemsHot$.next([{ id: 'a', color: 'red' }]);
      expectText('red');
    }));

    it('should move items around and keep them updated ', waitForAsync(() => {
      const template = `<div *rxFor="let item of itemsHot$; trackBy: trackById">{{item['color']}}</div>`;
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHot$.next([
        { id: 'a', color: 'blue' },
        { id: 'b', color: 'yellow' },
      ]);
      expectText('blueyellow');

      getComponent().itemsHot$.next([
        { id: 'b', color: 'orange' },
        { id: 'a', color: 'red' },
      ]);
      expectText('orangered');
    }));

    it('should handle added and removed items properly when tracking by index', waitForAsync(() => {
      const template = `<div *rxFor="let item of itemsHot$; trackBy: trackByIndex">{{item}}</div>`;
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHot$.next(['a', 'b', 'c', 'd']);
      getComponent().itemsHot$.next(['e', 'f', 'g', 'h']);
      getComponent().itemsHot$.next(['e', 'f', 'h']);
      expectText('efh');
    }));
  });
});

class Foo {
  toString() {
    return 'foo';
  }
}

import { ErrorHandler } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { ForModule } from '../for.module';
import {
  createErrorHandler,
  createTestComponent,
  setThis,
  TestComponent,
  thisArg,
} from './fixtures';
import SpyInstance = jest.SpyInstance;

const customErrorHandler: ErrorHandler = {
  handleError: jest.fn(),
};

describe('rxFor', () => {
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

  afterEach(() => {
    fixture = null as any;
    errorHandler = null as any;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ForModule],
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

  it(
    'should reflect initial elements',
    waitForAsync(() => {
      fixture = createTestComponent();

      detectChangesAndExpectText('1;2;');
    })
  );

  it(
    'should reflect added elements',
    waitForAsync(() => {
      fixture = createTestComponent();
      fixture.detectChanges();
      getComponent().items.push(3);
      detectChangesAndExpectText('1;2;3;');
    })
  );

  it(
    'should reflect removed elements',
    waitForAsync(() => {
      fixture = createTestComponent();
      fixture.detectChanges();
      getComponent().items.splice(1, 1);
      detectChangesAndExpectText('1;');
    })
  );

  it(
    'should reflect moved elements',
    waitForAsync(() => {
      fixture = createTestComponent();
      fixture.detectChanges();
      getComponent().items.splice(0, 1);
      getComponent().items.push(1);
      detectChangesAndExpectText('2;1;');
    })
  );

  it(
    'should reflect a mix of all changes (additions/removals/moves)',
    waitForAsync(() => {
      fixture = createTestComponent();

      getComponent().items = [0, 1, 2, 3, 4, 5];
      fixture.detectChanges();

      getComponent().items = [6, 2, 7, 0, 4, 8];

      detectChangesAndExpectText('6;2;7;0;4;8;');
    })
  );

  it(
    'should iterate over an array of objects',
    waitForAsync(() => {
      const template =
        '<ul><li *rxFor="let item of items">{{item["name"]}};</li></ul>';
      fixture = createTestComponent(template);

      // INIT
      getComponent().items = [{ name: 'misko' }, { name: 'shyam' }];
      detectChangesAndExpectText('misko;shyam;');

      // GROW
      getComponent().items.push({ name: 'adam' });
      detectChangesAndExpectText('misko;shyam;adam;');

      // SHRINK
      getComponent().items.splice(2, 1);
      getComponent().items.splice(0, 1);
      detectChangesAndExpectText('shyam;');
    })
  );

  it(
    'should gracefully handle nulls',
    waitForAsync(() => {
      const template = '<ul><li *rxFor="let item of null">{{item}};</li></ul>';
      fixture = createTestComponent(template);
      errorHandler = createErrorHandler();
      const errorSpy = jest.spyOn(errorHandler, 'handleError');

      detectChangesAndExpectText('');
      expect(errorSpy).toBeCalledTimes(0);
    })
  );

  it(
    'should gracefully handle ref changing to null and back',
    waitForAsync(() => {
      fixture = createTestComponent();
      errorHandler = createErrorHandler();
      const errorSpy = jest.spyOn(errorHandler, 'handleError');

      detectChangesAndExpectText('1;2;');

      getComponent().items = null!;
      detectChangesAndExpectText('');
      expect(errorSpy).toBeCalledTimes(0);

      getComponent().items = [1, 2, 3];
      detectChangesAndExpectText('1;2;3;');
    })
  );

  it(
    'should throw on non-iterable ref and suggest using an array',
    waitForAsync(() => {
      fixture = createTestComponent();
      errorHandler = createErrorHandler();
      const errorSpy = jest.spyOn(errorHandler, 'handleError');
      const expectedError = new Error(
        "Cannot find a differ supporting object 'whaaa' of type 'string'"
      );
      getComponent().items = <any>'whaaa';
      fixture.detectChanges();
      expect(errorSpy).toHaveBeenCalledWith(expectedError);
    })
  );

  it(
    'should throw on ref changing to string',
    waitForAsync(() => {
      fixture = createTestComponent();
      errorHandler = createErrorHandler();
      const errorSpy = jest.spyOn(errorHandler, 'handleError');
      const expectedError = new Error(
        "Error trying to diff 'whaaa'. Only arrays and iterables are allowed"
      );
      detectChangesAndExpectText('1;2;');

      getComponent().items = <any>'whaaa';
      fixture.detectChanges();
      expect(errorSpy).toHaveBeenCalledWith(expectedError);
    })
  );

  it(
    'should works with duplicates',
    waitForAsync(() => {
      fixture = createTestComponent();

      const a = new Foo();
      getComponent().items = [a, a];
      detectChangesAndExpectText('foo;foo;');
    })
  );

  it(
    'should repeat over nested arrays',
    waitForAsync(() => {
      const template =
        '<div *rxFor="let item of items">' +
        '<div *rxFor="let subitem of item">{{subitem}}-{{item.length}};</div>|' +
        '</div>';
      fixture = createTestComponent(template);

      getComponent().items = [['a', 'b'], ['c']];
      detectChangesAndExpectText('a-2;b-2;|c-1;|');

      getComponent().items = [['e'], ['f', 'g']];
      detectChangesAndExpectText('e-1;|f-2;g-2;|');
    })
  );

  it(
    'should repeat over nested arrays with no intermediate element',
    waitForAsync(() => {
      const template =
        '<div *rxFor="let item of items">' +
        '<div *rxFor="let subitem of item">{{subitem}}-{{item.length}};</div>' +
        '</div>';
      fixture = createTestComponent(template);

      getComponent().items = [['a', 'b'], ['c']];
      detectChangesAndExpectText('a-2;b-2;c-1;');

      getComponent().items = [['e'], ['f', 'g']];
      detectChangesAndExpectText('e-1;f-2;g-2;');
    })
  );

  it(
    'should repeat over nested ngIf that are the last node in the rxFor template',
    waitForAsync(() => {
      const template =
        `<div *rxFor="let item of items; let i=index">` +
        `<div>{{i}}|</div>` +
        `<div *ngIf="i % 2 == 0">even|</div>` +
        `</div>`;

      fixture = createTestComponent(template);

      const items = [1];
      getComponent().items = items;
      detectChangesAndExpectText('0|even|');

      items.push(1);
      detectChangesAndExpectText('0|even|1|');

      items.push(1);
      detectChangesAndExpectText('0|even|1|2|even|');
    })
  );

  it(
    'should allow of saving the collection',
    waitForAsync(() => {
      const template =
        '<ul><li *rxFor="let item of items as collection; index as i">{{i}}/{{collection.length}} - {{item}};</li></ul>';
      fixture = createTestComponent(template);

      detectChangesAndExpectText('0/2 - 1;1/2 - 2;');

      getComponent().items = [1, 2, 3];
      detectChangesAndExpectText('0/3 - 1;1/3 - 2;2/3 - 3;');
    })
  );

  it(
    'should display indices correctly',
    waitForAsync(() => {
      const template =
        '<span *rxFor ="let item of items; let i=index">{{i.toString()}}</span>';
      fixture = createTestComponent(template);

      getComponent().items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      detectChangesAndExpectText('0123456789');

      getComponent().items = [1, 2, 6, 7, 4, 3, 5, 8, 9, 0];
      detectChangesAndExpectText('0123456789');
    })
  );

  it(
    'should display count correctly',
    waitForAsync(() => {
      const template =
        '<span *rxFor="let item of items; let len=count">{{len}}</span>';
      fixture = createTestComponent(template);

      getComponent().items = [0, 1, 2];
      detectChangesAndExpectText('333');

      getComponent().items = [4, 3, 2, 1, 0, -1];
      detectChangesAndExpectText('666666');
    })
  );

  it(
    'should display first item correctly',
    waitForAsync(() => {
      const template =
        '<span *rxFor="let item of items; let isFirst=first">{{isFirst.toString()}}</span>';
      fixture = createTestComponent(template);

      getComponent().items = [0, 1, 2];
      detectChangesAndExpectText('truefalsefalse');

      getComponent().items = [2, 1];
      detectChangesAndExpectText('truefalse');
    })
  );

  it(
    'should display last item correctly',
    waitForAsync(() => {
      const template =
        '<span *rxFor="let item of items; let isLast=last">{{isLast.toString()}}</span>';
      fixture = createTestComponent(template);

      getComponent().items = [0, 1, 2];
      detectChangesAndExpectText('falsefalsetrue');

      getComponent().items = [2, 1];
      detectChangesAndExpectText('falsetrue');
    })
  );

  it(
    'should display even items correctly',
    waitForAsync(() => {
      const template =
        '<span *rxFor="let item of items; let isEven=even">{{isEven.toString()}}</span>';
      fixture = createTestComponent(template);

      getComponent().items = [0, 1, 2];
      detectChangesAndExpectText('truefalsetrue');

      getComponent().items = [2, 1];
      detectChangesAndExpectText('truefalse');
    })
  );

  it(
    'should display odd items correctly',
    waitForAsync(() => {
      const template =
        '<span *rxFor="let item of items; let isOdd=odd">{{isOdd.toString()}}</span>';
      fixture = createTestComponent(template);

      getComponent().items = [0, 1, 2, 3];
      detectChangesAndExpectText('falsetruefalsetrue');

      getComponent().items = [2, 1];
      detectChangesAndExpectText('falsetrue');
    })
  );

  it(
    'should allow to use a custom template',
    waitForAsync(() => {
      const template =
        '<ng-container *rxFor="let item of items; template: tpl"></ng-container>' +
        '<ng-template let-item let-i="index" #tpl><p>{{i}}: {{item}};</p></ng-template>';
      fixture = createTestComponent(template);
      getComponent().items = ['a', 'b', 'c'];
      fixture.detectChanges();
      detectChangesAndExpectText('0: a;1: b;2: c;');
    })
  );

  it(
    'should use a default template if a custom one is null',
    waitForAsync(() => {
      const template = `<ul><ng-container *rxFor="let item of items; template: null; let i=index">{{i}}: {{item}};</ng-container></ul>`;
      fixture = createTestComponent(template);
      getComponent().items = ['a', 'b', 'c'];
      fixture.detectChanges();
      detectChangesAndExpectText('0: a;1: b;2: c;');
    })
  );

  it(
    'should use a custom template when both default and a custom one are present',
    waitForAsync(() => {
      const template =
        '<ng-container *rxFor="let item of items; template: tpl">{{i}};</ng-container>' +
        '<ng-template let-item let-i="index" #tpl>{{i}}: {{item}};</ng-template>';
      fixture = createTestComponent(template);
      getComponent().items = ['a', 'b', 'c'];
      fixture.detectChanges();
      detectChangesAndExpectText('0: a;1: b;2: c;');
    })
  );

  describe('track by', () => {
    it(
      'should console.warn if trackBy is not a function',
      waitForAsync(() => {
        const template = `<p *rxFor="let item of items; trackBy: value"></p>`;
        fixture = createTestComponent(template);
        fixture.componentInstance.value = 0;
        fixture.detectChanges();
        expect(warnSpy).toBeCalledTimes(1);
      })
    );

    it(
      'should track by identity when trackBy is to `null` or `undefined`',
      waitForAsync(() => {
        const template = `<p *rxFor="let item of items; trackBy: value">{{ item }}</p>`;
        fixture = createTestComponent(template);
        fixture.componentInstance.items = ['a', 'b', 'c'];
        fixture.componentInstance.value = null;
        detectChangesAndExpectText('abc');
        fixture.componentInstance.value = undefined;
        detectChangesAndExpectText('abc');
        expect(warnSpy).toBeCalledTimes(0);
      })
    );

    it(
      'should set the context to the component instance',
      waitForAsync(() => {
        const template = `<p *rxFor="let item of items; trackBy: trackByContext.bind(this)"></p>`;
        fixture = createTestComponent(template);

        setThis(null);
        fixture.detectChanges();
        expect(thisArg).toBe(getComponent());
      })
    );

    it(
      'should not replace tracked items',
      waitForAsync(() => {
        const template = `<p *rxFor="let item of items; trackBy: trackById; let i=index">{{items[i]}}</p>`;
        fixture = createTestComponent(template);

        const buildItemList = () => {
          getComponent().items = [{ id: 'a' }];
          fixture.detectChanges();
          return fixture.debugElement.queryAll(By.css('p'))[0];
        };

        const firstP = buildItemList();
        const finalP = buildItemList();
        expect(finalP.nativeElement).toBe(firstP.nativeElement);
      })
    );

    it(
      'should update implicit local variable on view',
      waitForAsync(() => {
        const template = `<div *rxFor="let item of items; trackBy: trackById">{{item['color']}}</div>`;
        fixture = createTestComponent(template);

        getComponent().items = [{ id: 'a', color: 'blue' }];
        detectChangesAndExpectText('blue');

        getComponent().items = [{ id: 'a', color: 'red' }];
        detectChangesAndExpectText('red');
      })
    );

    it(
      'should move items around and keep them updated ',
      waitForAsync(() => {
        const template = `<div *rxFor="let item of items; trackBy: trackById">{{item['color']}}</div>`;
        fixture = createTestComponent(template);

        getComponent().items = [
          { id: 'a', color: 'blue' },
          { id: 'b', color: 'yellow' },
        ];
        detectChangesAndExpectText('blueyellow');

        getComponent().items = [
          { id: 'b', color: 'orange' },
          { id: 'a', color: 'red' },
        ];
        detectChangesAndExpectText('orangered');
      })
    );

    it(
      'should handle added and removed items properly when tracking by index',
      waitForAsync(() => {
        const template = `<div *rxFor="let item of items; trackBy: trackByIndex">{{item}}</div>`;
        fixture = createTestComponent(template);

        getComponent().items = ['a', 'b', 'c', 'd'];
        fixture.detectChanges();
        getComponent().items = ['e', 'f', 'g', 'h'];
        fixture.detectChanges();
        getComponent().items = ['e', 'f', 'h'];
        detectChangesAndExpectText('efh');
      })
    );
  });
});

class Foo {
  toString() {
    return 'foo';
  }
}

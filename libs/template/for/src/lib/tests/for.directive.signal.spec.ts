import { ErrorHandler } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { provideExperimentalRxForReconciliation } from '../provide-experimental-reconciler';
import { provideLegacyRxForReconciliation } from '../provide-legacy-reconciler';
import {
  createErrorHandler,
  createTestComponent as utilCreateTestComponent,
  setThis,
  TestComponent,
  thisArg,
} from './fixtures';

function createTestComponent(
  template = `<div><span *rxFor="let item of itemsHotSignal">{{item.toString()}};</span></div>`,
) {
  return utilCreateTestComponent(template);
}

describe('rxFor with signals', () => {
  describe.each([['legacy'], ['new']])('conciler: %p', (conciler) => {
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
      const customErrorHandler: ErrorHandler = {
        handleError: jest.fn(),
      };

      TestBed.configureTestingModule({
        imports: [TestComponent],
        providers: [
          {
            provide: ErrorHandler,
            useValue: customErrorHandler,
          },
          provideRxRenderStrategies({ primaryStrategy: 'native' }),
          conciler === 'legacy'
            ? provideLegacyRxForReconciliation()
            : provideExperimentalRxForReconciliation(),
        ],
      });
      warnSpy.mockClear();
    });

    it('should reflect initial elements', waitForAsync(() => {
      fixture = createTestComponent();
      detectChangesAndExpectText('1;2;');
    }));

    it('should reflect added elements', () => {
      fixture = createTestComponent();
      fixture.detectChanges();
      getComponent().itemsHotSignal.update((x) => {
        x.push(3);
        return [...x];
      });
      fixture.detectChanges();
      expectText('1;2;3;');
    });

    it('should reflect removed elements', () => {
      fixture = createTestComponent();
      fixture.detectChanges();
      const newValues = getComponent().itemsHotSignal();
      newValues.splice(1, 1);
      getComponent().itemsHotSignal.set([...newValues]);
      fixture.detectChanges();
      expectText('1;');
    });

    it('should reflect moved elements', () => {
      fixture = createTestComponent();
      fixture.detectChanges();
      const newValues = getComponent().itemsHotSignal();
      newValues.splice(0, 1);
      newValues.push(1);
      getComponent().itemsHotSignal.set([...newValues]);
      fixture.detectChanges();
      expectText('2;1;');
    });

    it('should reflect a mix of all changes (additions/removals/moves)', () => {
      fixture = createTestComponent();
      fixture.detectChanges();
      getComponent().itemsHotSignal.set([0, 1, 2, 3, 4, 5]);
      getComponent().itemsHotSignal.set([6, 2, 7, 0, 4, 8]);

      fixture.detectChanges();
      expectText('6;2;7;0;4;8;');
    });

    it('should iterate over an array of objects', waitForAsync(() => {
      const template =
        '<ul><li *rxFor="let item of itemsHotSignal">{{item["name"]}};</li></ul>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      // INIT
      getComponent().itemsHotSignal.set([{ name: 'misko' }, { name: 'shyam' }]);
      fixture.detectChanges();
      expectText('misko;shyam;');

      // GROW
      const values = getComponent().itemsHotSignal();
      values.push({ name: 'adam' });
      getComponent().itemsHotSignal.set([...values]);
      fixture.detectChanges();
      expectText('misko;shyam;adam;');

      // SHRINK
      values.splice(2, 1);
      values.splice(0, 1);
      getComponent().itemsHotSignal.set([...values]);
      fixture.detectChanges();
      expectText('shyam;');
    }));

    it('should gracefully handle nulls', waitForAsync(() => {
      const template =
        '<ul><li *rxFor="let item of itemsHotSignal">{{item}};</li></ul>';
      fixture = createTestComponent(template);
      getComponent().itemsHotSignal.set(null);
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

      getComponent().itemsHotSignal.set(null);
      fixture.detectChanges();
      expectText('');

      getComponent().itemsHotSignal.set([1, 2, 3]);
      fixture.detectChanges();
      expectText('1;2;3;');
      expect(errorSpy).toBeCalledTimes(0);
      errorSpy.mockClear();
    }));

    it('should throw on non-iterable ref and suggest using an array', waitForAsync(() => {
      fixture = createTestComponent();
      errorHandler = createErrorHandler();
      const errorSpy = jest.spyOn(errorHandler, 'handleError');
      const errorValue = 123;
      const expectedError = new Error(
        `Error trying to diff '${errorValue}'. Only arrays and iterables are allowed`,
      );
      getComponent().itemsHotSignal.set(<any>errorValue);
      fixture.detectChanges();
      expect(errorSpy).toHaveBeenCalledWith(expectedError);
      errorSpy.mockClear();
    }));

    it('should throw on ref changing to number', () => {
      fixture = createTestComponent();
      errorHandler = createErrorHandler();
      const errorSpy = jest.spyOn(errorHandler, 'handleError');
      const errorValue = 123;
      const expectedError = new Error(
        `Error trying to diff '${errorValue}'. Only arrays and iterables are allowed`,
      );
      detectChangesAndExpectText('1;2;');

      getComponent().itemsHotSignal.set(<any>errorValue);
      fixture.detectChanges();
      expect(errorSpy).toHaveBeenCalledWith(expectedError);
      errorSpy.mockClear();
    });

    it('should works with duplicates', waitForAsync(() => {
      fixture = createTestComponent();
      fixture.detectChanges();

      const a = new Foo();
      getComponent().itemsHotSignal.set([a, a]);
      fixture.detectChanges();
      expectText('foo;foo;');
    }));

    it('should repeat over nested arrays', waitForAsync(() => {
      const template =
        '<div *rxFor="let item of itemsHotSignal">' +
        '<div *rxFor="let subitem of item">{{subitem}}-{{item.length}};</div>|' +
        '</div>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([['a', 'b'], ['c']]);
      fixture.detectChanges();
      expectText('a-2;b-2;|c-1;|');

      getComponent().itemsHotSignal.set([['e'], ['f', 'g']]);
      fixture.detectChanges();
      expectText('e-1;|f-2;g-2;|');
    }));

    it('should repeat over nested arrays with no intermediate element', waitForAsync(() => {
      const template =
        '<div *rxFor="let item of itemsHotSignal">' +
        '<div *rxFor="let subitem of item">{{subitem}}-{{item.length}};</div>' +
        '</div>';
      fixture = createTestComponent(template);
      fixture.detectChanges();
      getComponent().itemsHotSignal.set([['a', 'b'], ['c']]);
      fixture.detectChanges();
      expectText('a-2;b-2;c-1;');

      getComponent().itemsHotSignal.set([['e'], ['f', 'g']]);
      fixture.detectChanges();
      expectText('e-1;f-2;g-2;');
    }));

    it('should repeat over nested arrays using select with no intermediate element', waitForAsync(() => {
      const template =
        '<div *rxFor="let item of itemsHotSignal; let subitems = select">' +
        '<div *rxFor="let subitem of subitems([\'items\']) as col">{{subitem}}-{{col.length}};</div>' +
        '</div>';
      fixture = createTestComponent(template);
      fixture.detectChanges();
      getComponent().itemsHotSignal.set([{ items: ['a', 'b', 'c'] }]);
      fixture.detectChanges();
      expectText('a-3;b-3;c-3;');

      getComponent().itemsHotSignal.set([{ items: ['d', 'e', 'f'] }]);
      fixture.detectChanges();
      expectText('d-3;e-3;f-3;');
    }));

    it('should repeat over nested ngIf that are the last node in the rxFor template', waitForAsync(() => {
      const template =
        `<div *rxFor="let item of itemsHotSignal; let i=index">` +
        `<div>{{i}}|</div>` +
        `<div *ngIf="i % 2 == 0">even|</div>` +
        `</div>`;

      fixture = createTestComponent(template);
      fixture.detectChanges();

      const items = [1];
      getComponent().itemsHotSignal.set([...items]);
      fixture.detectChanges();
      expectText('0|even|');

      items.push(1);
      getComponent().itemsHotSignal.set([...items]);
      fixture.detectChanges();
      expectText('0|even|1|');

      items.push(1);
      getComponent().itemsHotSignal.set([...items]);
      fixture.detectChanges();
      expectText('0|even|1|2|even|');
    }));

    it('should allow of saving the collection', waitForAsync(() => {
      const template =
        '<ul><li *rxFor="let item of itemsHotSignal as collection; index as i">{{i}}/{{collection.length}} -' +
        ' {{item}};</li></ul>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      expectText('0/2 - 1;1/2 - 2;');

      getComponent().itemsHotSignal.set([1, 2, 3]);
      fixture.detectChanges();
      expectText('0/3 - 1;1/3 - 2;2/3 - 3;');
    }));

    it('should display indices correctly', waitForAsync(() => {
      const template =
        '<span *rxFor ="let item of itemsHotSignal; let i=index">{{i.toString()}}</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      fixture.detectChanges();
      expectText('0123456789');

      getComponent().itemsHotSignal.set([1, 2, 6, 7, 4, 3, 5, 8, 9, 0]);
      fixture.detectChanges();
      expectText('0123456789');
    }));

    it('should display indices$ correctly', waitForAsync(() => {
      const template =
        '<span *rxFor ="let item of itemsHotSignal; let i=index$">{{(i | async).toString()}}</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      fixture.detectChanges();
      expectText('0123456789');

      getComponent().itemsHotSignal.set([1, 2, 6, 7, 4, 3, 5, 8, 9, 0]);
      fixture.detectChanges();
      expectText('0123456789');
    }));

    it('should display count correctly', waitForAsync(() => {
      const template =
        '<span *rxFor="let item of itemsHotSignal; let len=count">{{len}}</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([0, 1, 2]);
      fixture.detectChanges();
      expectText('333');

      getComponent().itemsHotSignal.set([4, 3, 2, 1, 0, -1]);
      fixture.detectChanges();
      expectText('666666');
    }));

    it('should display count$ correctly', waitForAsync(() => {
      const template =
        '<span *rxFor="let item of itemsHotSignal; let len=count$">{{len | async }}</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([0, 1, 2]);
      fixture.detectChanges();
      expectText('333');

      getComponent().itemsHotSignal.set([4, 3, 2, 1, 0, -1]);
      fixture.detectChanges();
      expectText('666666');
    }));

    it('should display first item correctly', waitForAsync(() => {
      const template =
        '<span *rxFor="let item of itemsHotSignal; let isFirst=first">{{isFirst.toString()}}</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([0, 1, 2]);
      fixture.detectChanges();
      expectText('truefalsefalse');

      getComponent().itemsHotSignal.set([2, 1]);
      fixture.detectChanges();
      expectText('truefalse');
    }));

    it('should display first$ item correctly', waitForAsync(() => {
      const template =
        '<span *rxFor="let item of itemsHotSignal; let isFirst=first$">{{(isFirst | async).toString()}}</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([0, 1, 2]);
      fixture.detectChanges();
      expectText('truefalsefalse');

      getComponent().itemsHotSignal.set([2, 1]);
      fixture.detectChanges();
      expectText('truefalse');
    }));

    it('should display last item correctly', waitForAsync(() => {
      const template =
        '<span *rxFor="let item of itemsHotSignal; let isLast=last">{{isLast.toString()}}</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([0, 1, 2]);
      fixture.detectChanges();
      expectText('falsefalsetrue');

      getComponent().itemsHotSignal.set([2, 1]);
      fixture.detectChanges();
      expectText('falsetrue');
    }));

    it('should display last item correctly', waitForAsync(() => {
      const template =
        '<span *rxFor="let item of itemsHotSignal; let isLast=last$">{{(isLast | async ).toString()}}</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([0, 1, 2]);
      fixture.detectChanges();
      expectText('falsefalsetrue');

      getComponent().itemsHotSignal.set([2, 1]);
      fixture.detectChanges();
      expectText('falsetrue');
    }));

    it('should display even items correctly', waitForAsync(() => {
      const template =
        '<span *rxFor="let item of itemsHotSignal; let isEven=even">{{isEven.toString()}}</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([0, 1, 2]);
      fixture.detectChanges();
      expectText('truefalsetrue');

      getComponent().itemsHotSignal.set([2, 1]);
      fixture.detectChanges();
      expectText('truefalse');
    }));

    it('should display even$ items correctly', waitForAsync(() => {
      const template =
        '<span *rxFor="let item of itemsHotSignal; let isEven=even$">{{(isEven | async).toString()}}</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([0, 1, 2]);
      fixture.detectChanges();
      expectText('truefalsetrue');

      getComponent().itemsHotSignal.set([2, 1]);
      fixture.detectChanges();
      expectText('truefalse');
    }));

    it('should display odd items correctly', waitForAsync(() => {
      const template =
        '<span *rxFor="let item of itemsHotSignal; let isOdd=odd">{{isOdd.toString()}}</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([0, 1, 2, 3]);
      fixture.detectChanges();
      expectText('falsetruefalsetrue');

      getComponent().itemsHotSignal.set([2, 1]);
      fixture.detectChanges();
      expectText('falsetrue');
    }));

    it('should display odd$ items correctly', waitForAsync(() => {
      const template =
        '<span *rxFor="let item of itemsHotSignal; let isOdd=odd$">{{(isOdd | async).toString()}}</span>';
      fixture = createTestComponent(template);
      fixture.detectChanges();

      getComponent().itemsHotSignal.set([0, 1, 2, 3]);
      fixture.detectChanges();
      expectText('falsetruefalsetrue');

      getComponent().itemsHotSignal.set([2, 1]);
      fixture.detectChanges();
      expectText('falsetrue');
    }));

    it('should allow to use a custom template', waitForAsync(() => {
      const template =
        '<ng-container *rxFor="let item of itemsHotSignal; template: tpl"></ng-container>' +
        '<ng-template let-item let-i="index" #tpl><p>{{i}}: {{item}};</p></ng-template>';
      fixture = createTestComponent(template);
      fixture.detectChanges();
      getComponent().itemsHotSignal.set(['a', 'b', 'c']);
      fixture.detectChanges();
      expectText('0: a;1: b;2: c;');
    }));

    it('should use a default template if a custom one is null', waitForAsync(() => {
      const template = `<ul><ng-container *rxFor="let item of itemsHotSignal; template: null; let i=index">{{i}}: {{item}};</ng-container></ul>`;
      fixture = createTestComponent(template);
      fixture.detectChanges();
      getComponent().itemsHotSignal.set(['a', 'b', 'c']);
      fixture.detectChanges();
      expectText('0: a;1: b;2: c;');
    }));

    it('should use a custom template when both default and a custom one are present', waitForAsync(() => {
      const template =
        '<ng-container *rxFor="let item of itemsHotSignal; template: tpl">{{i}};</ng-container>' +
        '<ng-template let-item let-i="index" #tpl>{{i}}: {{item}};</ng-template>';
      fixture = createTestComponent(template);
      fixture.detectChanges();
      getComponent().itemsHotSignal.set(['a', 'b', 'c']);
      fixture.detectChanges();
      expectText('0: a;1: b;2: c;');
    }));

    describe('track by', () => {
      it('should console.warn if trackBy is not a function', waitForAsync(() => {
        const template = `<p *rxFor="let item of itemsHotSignal; trackBy: value"></p>`;
        fixture = createTestComponent(template);
        fixture.componentInstance.value = 0;
        fixture.detectChanges();
        expect(warnSpy).toBeCalledTimes(1);
      }));

      it('should track by identity when trackBy is to `null` or `undefined`', waitForAsync(() => {
        const template = `<p *rxFor="let item of itemsHotSignal; trackBy: value">{{ item }}</p>`;
        fixture = createTestComponent(template);
        fixture.componentInstance.itemsHotSignal.set(['a', 'b', 'c']);
        fixture.componentInstance.value = null;
        detectChangesAndExpectText('abc');
        fixture.componentInstance.value = undefined;
        detectChangesAndExpectText('abc');
        expect(warnSpy).toBeCalledTimes(0);
      }));

      it('should set the context to the component instance', waitForAsync(() => {
        const template = `<p *rxFor="let item of itemsHotSignal; trackBy: trackByContext.bind(this)"></p>`;
        fixture = createTestComponent(template);

        setThis(null);
        fixture.detectChanges();
        expect(thisArg).toBe(getComponent());
      }));

      it('should not replace tracked items', waitForAsync(() => {
        const template = `<p *rxFor="let item of itemsHotSignal; trackBy: trackById; let i=index">{{items[i]}}</p>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();

        const buildItemList = () => {
          getComponent().itemsHotSignal.set([{ id: 'a' }]);
          return fixture.debugElement.queryAll(By.css('p'))[0];
        };

        const firstP = buildItemList();
        const finalP = buildItemList();
        expect(finalP.nativeElement).toBe(firstP.nativeElement);
      }));

      it('should update implicit local variable on view', waitForAsync(() => {
        const template = `<div *rxFor="let item of itemsHotSignal; trackBy: trackById">{{item['color']}}</div>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();

        getComponent().itemsHotSignal.set([{ id: 'a', color: 'blue' }]);
        fixture.detectChanges();
        expectText('blue');

        getComponent().itemsHotSignal.set([{ id: 'a', color: 'red' }]);
        fixture.detectChanges();
        expectText('red');
      }));

      it('should move items around and keep them updated ', waitForAsync(() => {
        const template = `<div *rxFor="let item of itemsHotSignal; trackBy: trackById">{{item['color']}}</div>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();

        getComponent().itemsHotSignal.set([
          { id: 'a', color: 'blue' },
          { id: 'b', color: 'yellow' },
        ]);
        fixture.detectChanges();
        expectText('blueyellow');

        getComponent().itemsHotSignal.set([
          { id: 'b', color: 'orange' },
          { id: 'a', color: 'red' },
        ]);
        fixture.detectChanges();
        expectText('orangered');
      }));

      it('should handle added and removed items properly when tracking by index', waitForAsync(() => {
        const template = `<div *rxFor="let item of itemsHotSignal; trackBy: trackByIndex">{{item}}</div>`;
        fixture = createTestComponent(template);
        fixture.detectChanges();

        getComponent().itemsHotSignal.set(['a', 'b', 'c', 'd']);
        getComponent().itemsHotSignal.set(['e', 'f', 'g', 'h']);
        getComponent().itemsHotSignal.set(['e', 'f', 'h']);
        fixture.detectChanges();
        expectText('efh');
      }));
    });
  });
});

class Foo {
  toString() {
    return 'foo';
  }
}

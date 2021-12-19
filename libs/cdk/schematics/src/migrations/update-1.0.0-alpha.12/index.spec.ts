import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';

describe('cdk migration 1.0.0-alpha-12', () => {
  let appTree: UnitTestTree;

  it('should replace coalescing', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        RxCoalescingOptions,
        coalescingObj,
        coalesceWith,
        coalescingManager,
        CoalescingManager
      } from '@rx-angular/cdk';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace coercing', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        coerceObservable,
        coerceObservableWith,
        coerceDistinctObservable,
        coerceDistinctWith,
        coerceAllFactory
      } from '@rx-angular/cdk';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace internals-scheduler', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        cancelCallback,
        scheduleCallback,
        forceFrameRate,
        PriorityLevel
      } from '@rx-angular/cdk';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace render-strategies', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        ScheduleOnStrategyOptions,
        RX_CONCURRENT_STRATEGIES,
        RxConcurrentStrategies,
        RX_NATIVE_STRATEGIES,
        RxNativeStrategies,
        onStrategy,
        strategyHandling,
        RxStrategies,
        RxStrategyNames,
        RxDefaultStrategyNames,
        RxConcurrentStrategyNames,
        RxNativeStrategyNames,
        RxCustomStrategyCredentials,
        RxStrategyCredentials,
        RxRenderBehavior,
        RxRenderWork,
        RX_ANGULAR_CONFIG,
        RX_ANGULAR_DEFAULTS,
        RxAngularConfig
      } from '@rx-angular/cdk';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule
        ],
        providers: [
          { provide: RX_ANGULAR_CONFIG, useValue: RX_ANGULAR_DEFAULTS }
        ],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace state', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        ObservableAccumulation,
        ObservableMap,
        accumulateObservables
      } from '@rx-angular/cdk';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace template', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        templateHandling,
        RxBaseTemplateNames,
        RxRenderAware,
        RxViewContext,
        rxBaseTemplateNames,
        RxTemplateManager,
        createTemplateManager,
        RxNotificationTemplateNameMap,
        RxListManager,
        createListTemplateManager,
        RxListViewComputedContext,
        RxDefaultListViewContext,
        RxListViewContext
      } from '@rx-angular/cdk';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace notifications', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        RxNotificationKind,
        RxNotification,
        RxCompleteNotification,
        RxErrorNotification,
        RxNextNotification,
        RxNotificationValue,
        RxSuspenseNotification,
        toRxErrorNotification,
        toRxSuspenseNotification,
        toRxCompleteNotification,
        templateTriggerHandling,
        rxMaterialize,
        createTemplateNotifier
      } from '@rx-angular/cdk';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace zone-less', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import { coerceObservableWith } from '@rx-angular/cdk/coercing';
      import {
        getZoneUnPatchedApi,
        Promise as unpatchedPromise,
        requestAnimationFrame,
        cancelAnimationFrame,
        setInterval,
        clearInterval,
        setTimeout,
        clearTimeout,
        unpatchAddEventListener,
        interval,
        timer,
        fromEvent,
        asyncScheduler,
        asapScheduler,
        queueScheduler,
        animationFrameScheduler
      } from '@rx-angular/cdk';
      import { setTimeout } from '@rx-angular/cdk';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });
  it('should replace zone-less in edge case', async () => {
    appTree = await setupTestFile(`
    import { ChangeDetectionStrategy, Component, TrackByFunction, ViewChild } from '@angular/core';
    import { NavigationEnd, Router } from '@angular/router';
    import { RxState } from '@rx-angular/state';
    import { filter, map } from 'rxjs';
    import { setTimeout } from '@rx-angular/cdk';

    @Component({
      selector: 'app-shell',
      templateUrl: './app-shell.component.html',
      styleUrls: ['./app-shell.component.scss'],
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [RxState]
    })
    export class AppShellComponent {

    }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  it('should replace zone-configurations', async () => {
    appTree = await setupTestFile(`
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import {
        focusEvents,
        mouseEvents,
        wheelEvents,
        inputEvents,
        formControlsEvents,
        keyboardEvents,
        vrEvents,
        mSGestureEvents,
        printEvents,
        networkEvents,
        audioEvents,
        compositionEvents,
        touchEvents,
        globalEvents,
        websocketEvents,
        xhrEvents,
        windowEvents,
        allEvents,
        EventTarget,
        RxZoneFlagsHelperFunctions,
        RxZoneGlobalConfigurations,
        RxZoneTestConfigurations,
        RxZoneRuntimeConfigurations,
        zoneConfig
      } from '@rx-angular/cdk';

      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
  `);

    const file = appTree.readContent('app.module.ts');

    expect(file).toMatchSnapshot();
  });

  function setupTestFile(fileInput: string, filePath = './app.module.ts') {
    const runner = new SchematicTestRunner(
      '@rx-angular/cdk',
      path.join(__dirname, '../../../migration.json')
    );
    const tree = new UnitTestTree(Tree.empty());

    tree.create(filePath, fileInput);

    return runner
      .runSchematicAsync(`update-1.0.0-alpha.12`, {}, tree)
      .toPromise();
  }
});

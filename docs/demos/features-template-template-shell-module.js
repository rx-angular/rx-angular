(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-template-template-shell-module"],{

/***/ "//Fd":
/*!***********************************************************************!*\
  !*** ./apps/demos/src/app/features/template/template-shell.module.ts ***!
  \***********************************************************************/
/*! exports provided: TemplateShellModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateShellModule", function() { return TemplateShellModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const ROUTES = [
    {
        path: '',
        redirectTo: 'rx-let',
        pathMatch: 'full'
    },
    {
        path: 'rx-let',
        loadChildren: () => __webpack_require__.e(/*! import() | rx-let-rx-let-demo-module */ "rx-let-rx-let-demo-module").then(__webpack_require__.bind(null, /*! ./rx-let/rx-let-demo.module */ "R9Bz")).then(m => m.RxLetDemoModule)
    },
    {
        path: 'rx-if',
        loadChildren: () => Promise.all(/*! import() | rx-if-rx-if-demo-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("default~error-handling-error-handing-module~http-errors-http-error-module~lazy-loading-components-la~31eb2066"), __webpack_require__.e("common"), __webpack_require__.e("rx-if-rx-if-demo-module")]).then(__webpack_require__.bind(null, /*! ./rx-if/rx-if-demo.module */ "XckT")).then(m => m.RxIfDemoModule)
    },
    {
        path: 'rx-for',
        loadChildren: () => __webpack_require__.e(/*! import() | rx-for-rx-for-module */ "rx-for-rx-for-module").then(__webpack_require__.bind(null, /*! ./rx-for/rx-for.module */ "TBQK")).then(m => m.RxForDemoModule)
    },
    {
        path: 'pipes',
        loadChildren: () => __webpack_require__.e(/*! import() | pipes-pipes-module */ "pipes-pipes-module").then(__webpack_require__.bind(null, /*! ./pipes/pipes.module */ "2G+s")).then(m => m.PipesModule)
    },
    {
        path: 'unpatch',
        loadChildren: () => __webpack_require__.e(/*! import() | unpatch-unpatch-module */ "unpatch-unpatch-module").then(__webpack_require__.bind(null, /*! ./unpatch/unpatch.module */ "ebAv")).then(m => m.UnpatchModule)
    },
    {
        path: 'rx-context',
        loadChildren: () => Promise.all(/*! import() | rx-context-rx-context-routed-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~error-handling-error-handing-modu~ae155b61"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~error-handling-error-handing-modu~1004e347"), __webpack_require__.e("default~error-handling-error-handing-module~http-errors-http-error-module~lazy-loading-components-la~31eb2066"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~pixel-priority-pixel-priority-mod~a5e67073"), __webpack_require__.e("common"), __webpack_require__.e("rx-context-rx-context-routed-module")]).then(__webpack_require__.bind(null, /*! ./rx-context/rx-context.routed.module */ "ZqPf")).then(m => m.RxContextRoutedModule)
    },
    {
        path: 'strategies',
        loadChildren: () => Promise.all(/*! import() | strategies-strategies-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("strategies-strategies-module")]).then(__webpack_require__.bind(null, /*! ./strategies/strategies.module */ "/1EC")).then(m => m.StrategiesModule)
    },
    {
        path: 'view-port-prio',
        loadChildren: () => __webpack_require__.e(/*! import() | viewport-prio-viewport-prio-demo-module */ "viewport-prio-viewport-prio-demo-module").then(__webpack_require__.bind(null, /*! ./viewport-prio/viewport-prio-demo.module */ "4b4S")).then(m => m.ViewportPrioModule)
    },
    {
        path: 'render-callback',
        loadChildren: () => Promise.all(/*! import() | render-callback-render-callback-module */[__webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~error-handling-error-handing-modu~ae155b61"), __webpack_require__.e("render-callback-render-callback-module")]).then(__webpack_require__.bind(null, /*! ./render-callback/render-callback.module */ "1uAJ"))
            .then(m => m.RenderCallbackModule)
    }
];
class TemplateShellModule {
}
TemplateShellModule.ɵfac = function TemplateShellModule_Factory(t) { return new (t || TemplateShellModule)(); };
TemplateShellModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: TemplateShellModule });
TemplateShellModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(ROUTES)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](TemplateShellModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=features-template-template-shell-module.js.map
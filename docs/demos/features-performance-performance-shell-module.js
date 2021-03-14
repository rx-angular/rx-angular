(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-performance-performance-shell-module"],{

/***/ "dK8a":
/*!*****************************************************************************!*\
  !*** ./apps/demos/src/app/features/performance/performance-shell.module.ts ***!
  \*****************************************************************************/
/*! exports provided: PerformanceShellModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerformanceShellModule", function() { return PerformanceShellModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const ROUTES = [
    {
        path: 'rx-let-vs-push',
        loadChildren: () => Promise.all(/*! import() | rx-let-vs-push-rx-let-vs-push-module */[__webpack_require__.e("common"), __webpack_require__.e("rx-let-vs-push-rx-let-vs-push-module")]).then(__webpack_require__.bind(null, /*! ./rx-let-vs-push/rx-let-vs-push.module */ "Qwqw")).then((m) => m.RxLetVsPushModule),
    },
    {
        path: 'alphas-compare',
        loadChildren: () => Promise.all(/*! import() | alphas-compare-alphas-compare-module */[__webpack_require__.e("default~alphas-compare-alphas-compare-module~lazy-loading-components-lazy-loading-components-module~~53140884"), __webpack_require__.e("default~alphas-compare-alphas-compare-module~pixel-priority-pixel-priority-module"), __webpack_require__.e("common"), __webpack_require__.e("alphas-compare-alphas-compare-module")]).then(__webpack_require__.bind(null, /*! ./alphas-compare/alphas-compare.module */ "e/mK")).then((m) => m.AlphasCompareModule),
    },
    {
        path: 'nested-component-structure',
        loadChildren: () => Promise.all(/*! import() | nested-component-structure-nested-component-structure-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("default~global-order-global-order-module~lazy-loading-components-lazy-loading-components-module~list~7a0a999e"), __webpack_require__.e("default~list-actions-list-actions-module~nested-component-structure-nested-component-structure-modul~14685a13"), __webpack_require__.e("common"), __webpack_require__.e("nested-component-structure-nested-component-structure-module")]).then(__webpack_require__.bind(null, /*! ./nested-component-structure/nested-component-structure.module */ "7hK6")).then((m) => m.NestedComponentStructureModule),
    },
    {
        path: 'sibling-component-structure',
        loadChildren: () => Promise.all(/*! import() | sibling-component-structure-sibling-component-structure-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("default~global-order-global-order-module~lazy-loading-components-lazy-loading-components-module~list~7a0a999e"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~error-handling-error-handing-modu~ae155b61"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~error-handling-error-handing-modu~1004e347"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~pixel-priority-pixel-priority-mod~a5e67073"), __webpack_require__.e("default~list-actions-list-actions-module~nested-component-structure-nested-component-structure-modul~14685a13"), __webpack_require__.e("default~comparison-comparison-module~pixel-priority-pixel-priority-module~sibling-component-structur~48c58d88"), __webpack_require__.e("common"), __webpack_require__.e("sibling-component-structure-sibling-component-structure-module")]).then(__webpack_require__.bind(null, /*! ./sibling-component-structure/sibling-component-structure.module */ "HPCF")).then((m) => m.SiblingComponentStructureModule),
    }
];
class PerformanceShellModule {
}
PerformanceShellModule.ɵfac = function PerformanceShellModule_Factory(t) { return new (t || PerformanceShellModule)(); };
PerformanceShellModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: PerformanceShellModule });
PerformanceShellModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(ROUTES)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PerformanceShellModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=features-performance-performance-shell-module.js.map
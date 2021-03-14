(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-concepts-fundamentals-module"],{

/***/ "QZgs":
/*!*********************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/fundamentals.module.ts ***!
  \*********************************************************************/
/*! exports provided: FundamentalsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FundamentalsModule", function() { return FundamentalsModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const ROUTES = [
    {
        path: 'nested-vs-injected',
        loadChildren: () => Promise.all(/*! import() | nested-vs-injected-nested-vs-injected-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~global-order-global-order-module~lazy-loading-components-lazy-loading-components-module~list~7a0a999e"), __webpack_require__.e("common"), __webpack_require__.e("nested-vs-injected-nested-vs-injected-module")]).then(__webpack_require__.bind(null, /*! ./nested-vs-injected/nested-vs-injected.module */ "t8Vn")).then(m => m.NestedVsInjectedModule)
    },
    {
        path: 'projected-views',
        loadChildren: () => Promise.all(/*! import() | projected-views-projected-views-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("projected-views-projected-views-module")]).then(__webpack_require__.bind(null, /*! ./projected-views/projected-views.module */ "WTKJ")).then(m => m.ProjectedViewsModule)
    },
    {
        path: 'passing-values',
        loadChildren: () => Promise.all(/*! import() | passing-values-passing-values-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("default~global-order-global-order-module~lazy-loading-components-lazy-loading-components-module~list~7a0a999e"), __webpack_require__.e("default~list-actions-list-actions-module~nested-component-structure-nested-component-structure-modul~14685a13"), __webpack_require__.e("passing-values-passing-values-module")]).then(__webpack_require__.bind(null, /*! ./passing-values/passing-values.module */ "YqiD")).then(m => m.PassingValuesModule)
    },
    {
        path: 'zone-patched-apis',
        loadChildren: () => Promise.all(/*! import() | zone-patched-apis-zone-patched-apis-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("common"), __webpack_require__.e("zone-patched-apis-zone-patched-apis-module")]).then(__webpack_require__.bind(null, /*! ./zone-patched-apis/zone-patched-apis.module */ "mklz")).then(m => m.ZonePatchedApisModule)
    },
    {
        path: 'scheduling',
        loadChildren: () => Promise.all(/*! import() | scheduling-scheduling-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("scheduling-scheduling-module")]).then(__webpack_require__.bind(null, /*! ./scheduling/scheduling.module */ "cLBw")).then(m => m.SchedulingModule)
    },
    {
        path: 'coalescing',
        loadChildren: () => Promise.all(/*! import() | coalescing-coalescing-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("coalescing-coalescing-module")]).then(__webpack_require__.bind(null, /*! ./coalescing/coalescing.module */ "sDzo")).then(m => m.CoalescingModule)
    },
    {
        path: 'global-order',
        loadChildren: () => Promise.all(/*! import() | global-order-global-order-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~global-order-global-order-module~lazy-loading-components-lazy-loading-components-module~list~7a0a999e"), __webpack_require__.e("global-order-global-order-module")]).then(__webpack_require__.bind(null, /*! ./global-order/global-order.module */ "uVGF")).then(m => m.GlobalOrderModule)
    },
    {
        path: 'view-vs-embedded-view',
        loadChildren: () => Promise.all(/*! import() | view-vs-embedded-view-view-vs-embedded-view-routed-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("view-vs-embedded-view-view-vs-embedded-view-routed-module")]).then(__webpack_require__.bind(null, /*! ./view-vs-embedded-view/view-vs-embedded-view.routed.module */ "mSXM")).then((m) => m.ViewVsEmbeddedViewRoutedModule),
    },
];
class FundamentalsModule {
}
FundamentalsModule.ɵfac = function FundamentalsModule_Factory(t) { return new (t || FundamentalsModule)(); };
FundamentalsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: FundamentalsModule });
FundamentalsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(ROUTES)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](FundamentalsModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=features-concepts-fundamentals-module.js.map
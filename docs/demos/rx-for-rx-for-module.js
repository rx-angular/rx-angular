(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["rx-for-rx-for-module"],{

/***/ "TBQK":
/*!**********************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/rx-for.module.ts ***!
  \**********************************************************************/
/*! exports provided: ROUTES, RxForDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxForDemoModule", function() { return RxForDemoModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const ROUTES = [
    {
        path: '',
        redirectTo: 'list-actions'
    },
    {
        path: 'list-actions',
        loadChildren: () => Promise.all(/*! import() | list-actions-list-actions-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("default~global-order-global-order-module~lazy-loading-components-lazy-loading-components-module~list~7a0a999e"), __webpack_require__.e("default~list-actions-list-actions-module~nested-component-structure-nested-component-structure-modul~14685a13"), __webpack_require__.e("list-actions-list-actions-module")]).then(__webpack_require__.bind(null, /*! ./list-actions/list-actions.module */ "7cnF")).then(m => m.ListActionsModule)
    },
    {
        path: 'nested-lists',
        loadChildren: () => Promise.all(/*! import() | nested-lists-nested-lists-routed-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("default~global-order-global-order-module~lazy-loading-components-lazy-loading-components-module~list~7a0a999e"), __webpack_require__.e("common"), __webpack_require__.e("nested-lists-nested-lists-routed-module")]).then(__webpack_require__.bind(null, /*! ./nested-lists/nested-lists.routed.module */ "+cgW")).then(m => m.NestedListsRoutedModule)
    },
    {
        path: 'route-change',
        loadChildren: () => __webpack_require__.e(/*! import() | route-change-route-change-module */ "route-change-route-change-module").then(__webpack_require__.bind(null, /*! ./route-change/route-change.module */ "LfBN")).then(m => m.RouteChangeModule)
    }
];
class RxForDemoModule {
}
RxForDemoModule.ɵfac = function RxForDemoModule_Factory(t) { return new (t || RxForDemoModule)(); };
RxForDemoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: RxForDemoModule });
RxForDemoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(ROUTES)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](RxForDemoModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=rx-for-rx-for-module.js.map
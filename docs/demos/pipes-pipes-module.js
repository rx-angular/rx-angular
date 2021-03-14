(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pipes-pipes-module"],{

/***/ "2G+s":
/*!********************************************************************!*\
  !*** ./apps/demos/src/app/features/template/pipes/pipes.module.ts ***!
  \********************************************************************/
/*! exports provided: ROUTES, PipesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipesModule", function() { return PipesModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const ROUTES = [
    {
        path: '',
        redirectTo: 'push'
    },
    {
        path: 'push',
        loadChildren: () => __webpack_require__.e(/*! import() | push-poc-push-poc-module */ "push-poc-push-poc-module").then(__webpack_require__.bind(null, /*! ./push-poc/push-poc.module */ "9tsi")).then(m => m.PushPocModule)
    },
    {
        path: 'memo',
        loadChildren: () => Promise.all(/*! import() | memo-poc-memo-poc-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~global-order-global-order-module~lazy-loading-components-lazy-loading-components-module~list~7a0a999e"), __webpack_require__.e("common"), __webpack_require__.e("memo-poc-memo-poc-module")]).then(__webpack_require__.bind(null, /*! ./memo-poc/memo-poc.module */ "n0z8")).then(m => m.MemoPocModule)
    },
    {
        path: 'pipe',
        loadChildren: () => __webpack_require__.e(/*! import() | pipe-poc-pipe-poc-module */ "pipe-poc-pipe-poc-module").then(__webpack_require__.bind(null, /*! ./pipe-poc/pipe-poc.module */ "FIzo")).then(m => m.PipePocModule)
    }
];
class PipesModule {
}
PipesModule.ɵfac = function PipesModule_Factory(t) { return new (t || PipesModule)(); };
PipesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: PipesModule });
PipesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(ROUTES)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PipesModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=pipes-pipes-module.js.map
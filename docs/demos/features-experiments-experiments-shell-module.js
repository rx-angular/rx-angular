(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-experiments-experiments-shell-module"],{

/***/ "jB7U":
/*!*****************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/experiments-shell.module.ts ***!
  \*****************************************************************************/
/*! exports provided: ExperimentsShellModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExperimentsShellModule", function() { return ExperimentsShellModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const ROUTES = [
    {
        path: 'strategies',
        loadChildren: () => Promise.all(/*! import() | strategies-strategies-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("strategies-strategies-module")]).then(__webpack_require__.bind(null, /*! ./strategies/strategies.module */ "iwHF")).then((m) => m.StrategiesModule)
    },
    {
        path: 'rx-base-state',
        loadChildren: () => Promise.all(/*! import() | state-rx-state-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~pokemon-pagination-pokemon-pagination-module~state-rx-state-module"), __webpack_require__.e("state-rx-state-module")]).then(__webpack_require__.bind(null, /*! ./state/rx-state.module */ "cDpE")).then((mod) => mod.RxStateModule),
        canActivate: [],
        canActivateChild: []
    },
    {
        path: 'structural-directives',
        loadChildren: () => __webpack_require__.e(/*! import() | structural-directives-structural-directives-module */ "structural-directives-structural-directives-module").then(__webpack_require__.bind(null, /*! ./structural-directives/structural-directives.module */ "GbPP")).then((m) => m.StructuralDirectivesModule)
    },
    {
        path: 'input-bindings',
        loadChildren: () => Promise.all(/*! import() | input-bindings-input-bindings-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("input-bindings-input-bindings-module")]).then(__webpack_require__.bind(null, /*! ./input-bindings/input-bindings.module */ "f1zv")).then((m) => m.InputBindingsModule)
    },
    {
        path: 'decorators',
        loadChildren: () => __webpack_require__.e(/*! import() | decorators-decorators-module */ "decorators-decorators-module").then(__webpack_require__.bind(null, /*! ./decorators/decorators.module */ "F7U6")).then((m) => m.DecoratorsModule)
    }
];
class ExperimentsShellModule {
}
ExperimentsShellModule.ɵfac = function ExperimentsShellModule_Factory(t) { return new (t || ExperimentsShellModule)(); };
ExperimentsShellModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: ExperimentsShellModule });
ExperimentsShellModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(ROUTES)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ExperimentsShellModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=features-experiments-experiments-shell-module.js.map
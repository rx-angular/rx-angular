(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["structural-directives-structural-directives-module"],{

/***/ "GbPP":
/*!*******************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/structural-directives/structural-directives.module.ts ***!
  \*******************************************************************************************************/
/*! exports provided: StructuralDirectivesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StructuralDirectivesModule", function() { return StructuralDirectivesModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _structural_directives_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structural-directives.routes */ "nS5T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class StructuralDirectivesModule {
}
StructuralDirectivesModule.ɵfac = function StructuralDirectivesModule_Factory(t) { return new (t || StructuralDirectivesModule)(); };
StructuralDirectivesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: StructuralDirectivesModule });
StructuralDirectivesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_structural_directives_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](StructuralDirectivesModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();


/***/ }),

/***/ "nS5T":
/*!*******************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/structural-directives/structural-directives.routes.ts ***!
  \*******************************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
const ROUTES = [
    {
        path: '',
        redirectTo: 'rx-switch-poc',
    },
    {
        path: 'rx-switch-poc',
        loadChildren: () => Promise.all(/*! import() | rx-switch-poc-rx-switch-poc-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("default~global-order-global-order-module~lazy-loading-components-lazy-loading-components-module~list~7a0a999e"), __webpack_require__.e("rx-switch-poc-rx-switch-poc-module")]).then(__webpack_require__.bind(null, /*! ./rx-switch-poc/rx-switch-poc.module */ "/DVU")).then((m) => m.RxSwitchPocModule),
    },
    {
        path: 'if-visible',
        loadChildren: () => Promise.all(/*! import() | if-visible-poc-if-visible-routed-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("if-visible-poc-if-visible-routed-module")]).then(__webpack_require__.bind(null, /*! ./if-visible-poc/if-visible-routed.module */ "COOv")).then((m) => m.IfVisibleRoutedModule),
    },
];


/***/ })

}]);
//# sourceMappingURL=structural-directives-structural-directives-module.js.map
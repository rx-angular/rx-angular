(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["decorators-decorators-module"],{

/***/ "F7U6":
/*!*********************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/decorators/decorators.module.ts ***!
  \*********************************************************************************/
/*! exports provided: DecoratorsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DecoratorsModule", function() { return DecoratorsModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _decorators_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decorators.routes */ "xZ0S");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




class DecoratorsModule {
}
DecoratorsModule.ɵfac = function DecoratorsModule_Factory(t) { return new (t || DecoratorsModule)(); };
DecoratorsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: DecoratorsModule });
DecoratorsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(_decorators_routes__WEBPACK_IMPORTED_MODULE_1__["ROUTES"])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](DecoratorsModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "xZ0S":
/*!*********************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/decorators/decorators.routes.ts ***!
  \*********************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
const ROUTES = [
    {
        path: '',
        redirectTo: 'stateful',
    },
    {
        path: 'stateful',
        loadChildren: () => Promise.all(/*! import() | stateful-stateful-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("stateful-stateful-module")]).then(__webpack_require__.bind(null, /*! ./stateful/stateful.module */ "mVc4")).then((m) => m.StatefulModule),
    },
];


/***/ })

}]);
//# sourceMappingURL=decorators-decorators-module.js.map
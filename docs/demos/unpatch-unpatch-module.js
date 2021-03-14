(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["unpatch-unpatch-module"],{

/***/ "JADr":
/*!************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/unpatch/unpatch.routes.ts ***!
  \************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
const ROUTES = [
    {
        path: '',
        redirectTo: 'comparison',
        pathMatch: 'full'
    },
    {
        path: 'comparison',
        loadChildren: () => __webpack_require__.e(/*! import() | comparison-unpatch-comparison-module */ "comparison-unpatch-comparison-module").then(__webpack_require__.bind(null, /*! ./comparison/unpatch-comparison.module */ "1KcF")).then(m => m.UnpatchComparisonModule)
    }
];


/***/ }),

/***/ "ebAv":
/*!************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/unpatch/unpatch.module.ts ***!
  \************************************************************************/
/*! exports provided: UnpatchModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnpatchModule", function() { return UnpatchModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _unpatch_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unpatch.routes */ "JADr");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class UnpatchModule {
}
UnpatchModule.ɵfac = function UnpatchModule_Factory(t) { return new (t || UnpatchModule)(); };
UnpatchModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: UnpatchModule });
UnpatchModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_unpatch_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](UnpatchModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=unpatch-unpatch-module.js.map
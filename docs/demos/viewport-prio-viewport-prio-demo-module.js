(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["viewport-prio-viewport-prio-demo-module"],{

/***/ "4b4S":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/viewport-prio/viewport-prio-demo.module.ts ***!
  \*****************************************************************************************/
/*! exports provided: ViewportPrioModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewportPrioModule", function() { return ViewportPrioModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _viewport_prio_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./viewport-prio.routes */ "usI7");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class ViewportPrioModule {
}
ViewportPrioModule.ɵfac = function ViewportPrioModule_Factory(t) { return new (t || ViewportPrioModule)(); };
ViewportPrioModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: ViewportPrioModule });
ViewportPrioModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_viewport_prio_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ViewportPrioModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();


/***/ }),

/***/ "usI7":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/viewport-prio/viewport-prio.routes.ts ***!
  \************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
const ROUTES = [
    {
        path: '',
        redirectTo: 'basic-example'
    },
    {
        path: 'basic-example',
        loadChildren: () => Promise.all(/*! import() | basic-example-basic-example-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"), __webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"), __webpack_require__.e("basic-example-basic-example-module")]).then(__webpack_require__.bind(null, /*! ./basic-example/basic-example.module */ "Ccl0")).then(m => m.BasicExampleModule)
    }
];


/***/ })

}]);
//# sourceMappingURL=viewport-prio-viewport-prio-demo-module.js.map
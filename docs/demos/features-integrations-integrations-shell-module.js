(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-integrations-integrations-shell-module"],{

/***/ "B3fT":
/*!*******************************************************************************!*\
  !*** ./apps/demos/src/app/features/integrations/integrations-shell.module.ts ***!
  \*******************************************************************************/
/*! exports provided: IntegrationsShellModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntegrationsShellModule", function() { return IntegrationsShellModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const SHOWCASES_ROUTES = [
    {
        path: '',
        redirectTo: 'dynamic-counter',
        pathMatch: 'full',
    },
    {
        path: 'dynamic-counter',
        loadChildren: () => __webpack_require__.e(/*! import() | dynamic-counter-dynamic-counter-module */ "dynamic-counter-dynamic-counter-module").then(__webpack_require__.bind(null, /*! ./dynamic-counter/dynamic-counter.module */ "cEAE")).then((m) => m.DynamicCounterModule),
    },
    {
        path: 'pokemon-pagination',
        loadChildren: () => Promise.all(/*! import() | pokemon-pagination-pokemon-pagination-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~error-handling-error-handing-modu~ae155b61"), __webpack_require__.e("default~pokemon-pagination-pokemon-pagination-module~state-rx-state-module"), __webpack_require__.e("pokemon-pagination-pokemon-pagination-module")]).then(__webpack_require__.bind(null, /*! ./pokemon-pagination/pokemon-pagination.module */ "+pKM")).then((m) => m.PokemonPaginationModule),
    },
];
class IntegrationsShellModule {
}
IntegrationsShellModule.ɵfac = function IntegrationsShellModule_Factory(t) { return new (t || IntegrationsShellModule)(); };
IntegrationsShellModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: IntegrationsShellModule });
IntegrationsShellModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(SHOWCASES_ROUTES)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](IntegrationsShellModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=features-integrations-integrations-shell-module.js.map
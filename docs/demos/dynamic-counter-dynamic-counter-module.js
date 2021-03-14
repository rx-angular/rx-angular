(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dynamic-counter-dynamic-counter-module"],{

/***/ "OQb1":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/integrations/dynamic-counter/dynamic-counter.routes.ts ***!
  \********************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
const ROUTES = [
    {
        path: '',
        redirectTo: 'rx-state-and-reactive-forms'
    },
    {
        path: 'rx-state-and-reactive-forms',
        loadChildren: () => Promise.all(/*! import() | rx-state-and-reactive-forms-rx-state-and-reactive-forms-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~alphas-compare-alphas-compare-module~lazy-loading-components-lazy-loading-components-module~~53140884"), __webpack_require__.e("common"), __webpack_require__.e("rx-state-and-reactive-forms-rx-state-and-reactive-forms-module")]).then(__webpack_require__.bind(null, /*! ./rx-state-and-reactive-forms/rx-state-and-reactive-forms.module */ "49q8")).then(m => m.RxStateAndReactiveFormsModule)
    },
    {
        path: 'rx-state-as-presenter',
        loadChildren: () => Promise.all(/*! import() | rx-state-as-presenter-rx-state-as-presenter-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("common"), __webpack_require__.e("rx-state-as-presenter-rx-state-as-presenter-module")]).then(__webpack_require__.bind(null, /*! ./rx-state-as-presenter/rx-state-as-presenter.module */ "zHBK")).then(m => m.RxStateAsPresenterModule)
    },
    {
        path: 'rx-state-in-the-view',
        loadChildren: () => Promise.all(/*! import() | rx-state-in-the-view-rx-state-in-the-view-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("common"), __webpack_require__.e("rx-state-in-the-view-rx-state-in-the-view-module")]).then(__webpack_require__.bind(null, /*! ./rx-state-in-the-view/rx-state-in-the-view.module */ "11Im")).then(m => m.RxStateInTheViewModule)
    },
    {
        path: 'rx-state-and-subjects',
        loadChildren: () => Promise.all(/*! import() | rx-state-and-subjects-rx-state-and-subjects-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("common"), __webpack_require__.e("rx-state-and-subjects-rx-state-and-subjects-module")]).then(__webpack_require__.bind(null, /*! ./rx-state-and-subjects/rx-state-and-subjects.module */ "w/5P")).then(m => m.RxStateAndSubjectsModule)
    },
    {
        path: 'starter',
        loadChildren: () => Promise.all(/*! import() | starter-starter-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("common"), __webpack_require__.e("starter-starter-module")]).then(__webpack_require__.bind(null, /*! ./starter/starter.module */ "K4Iz")).then(m => m.StarterModule)
    }
];


/***/ }),

/***/ "cEAE":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/integrations/dynamic-counter/dynamic-counter.module.ts ***!
  \********************************************************************************************/
/*! exports provided: DynamicCounterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicCounterModule", function() { return DynamicCounterModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _dynamic_counter_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dynamic-counter.routes */ "OQb1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




class DynamicCounterModule {
}
DynamicCounterModule.ɵfac = function DynamicCounterModule_Factory(t) { return new (t || DynamicCounterModule)(); };
DynamicCounterModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: DynamicCounterModule });
DynamicCounterModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(_dynamic_counter_routes__WEBPACK_IMPORTED_MODULE_1__["ROUTES"])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](DynamicCounterModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=dynamic-counter-dynamic-counter-module.js.map
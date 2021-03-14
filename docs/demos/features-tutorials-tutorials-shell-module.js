(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-tutorials-tutorials-shell-module"],{

/***/ "cVoX":
/*!*************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/tutorials-shell.module.ts ***!
  \*************************************************************************/
/*! exports provided: TutorialsShellModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TutorialsShellModule", function() { return TutorialsShellModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const TUTORIAL_ROUTES = [
    {
        path: '',
        redirectTo: 'basics',
        pathMatch: 'full'
    },
    {
        path: 'basics',
        loadChildren: () => Promise.all(/*! import() | basics-tutorial-basics-module */[__webpack_require__.e("default~basic-example-basic-example-module~basic-rx-let-basic-module~basics-tutorial-basics-module~e~60c35f95"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~error-handling-error-handing-modu~ae155b61"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~error-handling-error-handing-modu~1004e347"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~pixel-priority-pixel-priority-mod~a5e67073"), __webpack_require__.e("default~basics-tutorial-basics-module~error-handling-error-handing-module~http-errors-http-error-mod~fe4d98d4"), __webpack_require__.e("basics-tutorial-basics-module")]).then(__webpack_require__.bind(null, /*! ./basics/tutorial-basics.module */ "JB58")).then(m => m.TutorialBasicsModule)
    },
];
class TutorialsShellModule {
}
TutorialsShellModule.ɵfac = function TutorialsShellModule_Factory(t) { return new (t || TutorialsShellModule)(); };
TutorialsShellModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: TutorialsShellModule });
TutorialsShellModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(TUTORIAL_ROUTES)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](TutorialsShellModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=features-tutorials-tutorials-shell-module.js.map
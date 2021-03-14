(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~error-handling-error-handing-module~http-errors-http-error-module~lazy-loading-components-la~31eb2066"],{

/***/ "3UD+":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "5UfF":
/*!**************************************************************!*\
  !*** ./node_modules/perf-marks/dist/es2015/is-nodejs-env.js ***!
  \**************************************************************/
/*! exports provided: isNodeJSEnv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNodeJSEnv", function() { return isNodeJSEnv; });
/**
 * Boolean with the result of the check if package
 * is running on the browser or in a NodeJS environment
 *
 * @returns boolean
 *
 */
const isNodeJSEnv = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
// Interesting fact:
// Some bundlers are resolving `process`, so it needs to check for process.release.name
// since it's a NodeJS only environment value.
// More details in https://nodejs.org/api/process.html#process_process_release



/***/ }),

/***/ "EuKt":
/*!******************************************************!*\
  !*** ./node_modules/perf-marks/dist/es2015/marks.js ***!
  \******************************************************/
/*! exports provided: start, end, clear, clearAll, isUserTimingAPISupported, isPerformanceObservableSupported */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "end", function() { return end; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clear", function() { return clear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAll", function() { return clearAll; });
/* harmony import */ var _is_user_timing_api_supported__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-user-timing-api-supported */ "oyBm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isUserTimingAPISupported", function() { return _is_user_timing_api_supported__WEBPACK_IMPORTED_MODULE_0__["isUserTimingAPISupported"]; });

/* harmony import */ var _is_performance_observable_supported__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-performance-observable-supported */ "dgof");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPerformanceObservableSupported", function() { return _is_performance_observable_supported__WEBPACK_IMPORTED_MODULE_1__["isPerformanceObservableSupported"]; });

/* harmony import */ var _is_nodejs_env__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-nodejs-env */ "5UfF");



// Map() is not used in order to decrease the bundle
let marksMap = {};
let marksObserver = {};
/**
 * Get the current time based on User Timing API or Date
 *
 * @returns number
 *
 */
const getTimeNow = () => {
    if (_is_user_timing_api_supported__WEBPACK_IMPORTED_MODULE_0__["isUserTimingAPISupported"]) {
        return performance.now();
    }
    return Date.now();
};
/**
 * Clear marks and measure of performance event
 *
 * @param markName - Performance marker to be checked
 *
 * @returns void
 *
 */
const clear = (markName) => {
    marksMap[markName] = undefined;
    // Removes PerformanceObserver references from memory
    if (!!marksObserver[markName]) {
        marksObserver[markName] = undefined;
    }
    if (!_is_user_timing_api_supported__WEBPACK_IMPORTED_MODULE_0__["isUserTimingAPISupported"]) {
        return;
    }
    // Some versions of NodeJS doesn't support this method
    if (!_is_nodejs_env__WEBPACK_IMPORTED_MODULE_2__["isNodeJSEnv"]) {
        performance.clearMeasures(markName);
    }
    performance.clearMarks(markName);
};
/**
 * Start performance measure of event
 *
 * @param markName - Performance marker to be started
 *
 * @returns number
 *
 */
const start = (markName) => {
    if (_is_user_timing_api_supported__WEBPACK_IMPORTED_MODULE_0__["isUserTimingAPISupported"]) {
        if (_is_nodejs_env__WEBPACK_IMPORTED_MODULE_2__["isNodeJSEnv"] && _is_performance_observable_supported__WEBPACK_IMPORTED_MODULE_1__["isPerformanceObservableSupported"]) {
            // eslint-disable-next-line compat/compat
            const obs = new PerformanceObserver(list => {
                marksObserver[markName] = list.getEntries().find(f => f.name === markName);
                obs.disconnect();
            });
            obs.observe({ entryTypes: ['measure'] });
        }
        performance.mark(markName);
    }
    marksMap[markName] = getTimeNow();
};
/**
 * Finishes performance measure of event and
 * clear marks and measure if applicable
 *
 * @param markName - Performance marker to be checked
 * @param markNameToCompare - Optional mark to compare to
 *
 * @returns PerfMarksPerformanceEntry
 *
 */
const end = (markName, markNameToCompare) => {
    try {
        const startTime = marksMap[markName];
        if (!_is_user_timing_api_supported__WEBPACK_IMPORTED_MODULE_0__["isUserTimingAPISupported"]) {
            return startTime
                ? { duration: getTimeNow() - startTime, startTime, entryType: 'measure', name: markName }
                : {};
        }
        // If there's no User Timing mark to be compared with,
        // the package will create one to be used for better comparison
        if (!markNameToCompare) {
            performance.mark(`${markName}-end`);
        }
        performance.measure(markName, markName, markNameToCompare || `${markName}-end`);
        if (_is_nodejs_env__WEBPACK_IMPORTED_MODULE_2__["isNodeJSEnv"]) {
            if (!!marksObserver[markName]) {
                return marksObserver[markName];
            }
            return startTime
                ? { duration: getTimeNow() - startTime, startTime, entryType: 'measure', name: markName }
                : {};
        }
        const entry = performance.getEntriesByName(markName).pop();
        return entry || {};
    }
    catch (e) {
        // If previous mark was missing for some reason, this will throw.
        // This could only happen if something in event loop crashed
        // in an unexpected place earlier.
        // Don't pile on with more errors.
        return {};
    }
    finally {
        // Clear marks immediately to avoid growing buffer.
        clear(markName);
        // Clear marks used for comparison in case of it's value was passed
        // If the mark to compare is not passed, it should remove the one we create with `-end` suffix
        clear(markNameToCompare || `${markName}-end`);
    }
};
/**
 * Clear all marks and measures of performance event
 *
 * @returns void
 *
 */
const clearAll = () => {
    marksMap = {};
    marksObserver = {};
    if (!_is_user_timing_api_supported__WEBPACK_IMPORTED_MODULE_0__["isUserTimingAPISupported"]) {
        return;
    }
    // Some versions of NodeJS doesn't support this method
    if (!_is_nodejs_env__WEBPACK_IMPORTED_MODULE_2__["isNodeJSEnv"]) {
        performance.clearMeasures();
    }
    performance.clearMarks();
};



/***/ }),

/***/ "QOJq":
/*!*************************************************************************!*\
  !*** ./node_modules/perf-marks/dist/es2015/user-timing-api-resolver.js ***!
  \*************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _is_nodejs_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-nodejs-env */ "5UfF");

if (_is_nodejs_env__WEBPACK_IMPORTED_MODULE_0__["isNodeJSEnv"] &&
    !global.PerformanceObserver &&
    !global.performance &&
    module &&
    typeof module.require === 'function') {
    /**
     * Requires a module which is protected against bundler minification.
     *
     * @param pkg The module path to resolve
     */
    const dynamicRequire = (mod, pkg) => {
        return mod.require(pkg);
    };
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { PerformanceObserver, performance } = dynamicRequire(module, 'perf_hooks');
        global.PerformanceObserver = PerformanceObserver;
        global.performance = performance;
    }
    catch (error) {
        throw new Error(`Your NodeJS application doesn't support 'perf_hooks'. ${error}`);
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/harmony-module.js */ "3UD+")(module)))

/***/ }),

/***/ "dgof":
/*!************************************************************************************!*\
  !*** ./node_modules/perf-marks/dist/es2015/is-performance-observable-supported.js ***!
  \************************************************************************************/
/*! exports provided: isPerformanceObservableSupported */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPerformanceObservableSupported", function() { return isPerformanceObservableSupported; });
/**
 * Boolean with the result of the check if PerformanceObservable
 * is supported for the current browser/NodeJS version
 *
 * @returns boolean
 *
 */
const isPerformanceObservableSupported = typeof PerformanceObserver !== 'undefined' &&
    // eslint-disable-next-line compat/compat
    typeof PerformanceObserver.prototype !== 'undefined' &&
    // eslint-disable-next-line compat/compat
    typeof PerformanceObserver.prototype.constructor === 'function';



/***/ }),

/***/ "erbw":
/*!******************************************************************!*\
  !*** ./node_modules/perf-marks/dist/es2015/entrypoints/marks.js ***!
  \******************************************************************/
/*! exports provided: start, end, clear, clearAll, isUserTimingAPISupported, isPerformanceObservableSupported */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user_timing_api_resolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../user-timing-api-resolver */ "QOJq");
/* harmony import */ var _marks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../marks */ "EuKt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "start", function() { return _marks__WEBPACK_IMPORTED_MODULE_1__["start"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "end", function() { return _marks__WEBPACK_IMPORTED_MODULE_1__["end"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clear", function() { return _marks__WEBPACK_IMPORTED_MODULE_1__["clear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearAll", function() { return _marks__WEBPACK_IMPORTED_MODULE_1__["clearAll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isUserTimingAPISupported", function() { return _marks__WEBPACK_IMPORTED_MODULE_1__["isUserTimingAPISupported"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPerformanceObservableSupported", function() { return _marks__WEBPACK_IMPORTED_MODULE_1__["isPerformanceObservableSupported"]; });





/***/ }),

/***/ "oyBm":
/*!*****************************************************************************!*\
  !*** ./node_modules/perf-marks/dist/es2015/is-user-timing-api-supported.js ***!
  \*****************************************************************************/
/*! exports provided: isUserTimingAPISupported */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUserTimingAPISupported", function() { return isUserTimingAPISupported; });
/**
 * Boolean with the result of the check if User Timing API
 * is supported for the current browser/NodeJS version
 *
 * @returns boolean
 *
 */
const isUserTimingAPISupported = typeof performance !== 'undefined' &&
    typeof performance.now !== 'undefined' &&
    typeof performance.mark === 'function' &&
    typeof performance.measure === 'function' &&
    (typeof performance.clearMarks === 'function' || typeof performance.clearMeasures === 'function');



/***/ }),

/***/ "xJkR":
/*!***************************************************************************************!*\
  !*** ./node_modules/ngx-skeleton-loader/__ivy_ngcc__/fesm2015/ngx-skeleton-loader.js ***!
  \***************************************************************************************/
/*! exports provided: NgxSkeletonLoaderComponent, NgxSkeletonLoaderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxSkeletonLoaderComponent", function() { return NgxSkeletonLoaderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxSkeletonLoaderModule", function() { return NgxSkeletonLoaderModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var perf_marks_marks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! perf-marks/marks */ "erbw");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");




/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-skeleton-loader.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



const _c0 = function (a0, a1, a2, a3) { return { circle: a0, progress: a1, "progress-dark": a2, pulse: a3 }; };
function NgxSkeletonLoaderComponent_span_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "span", 1);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction4"](3, _c0, ctx_r0.appearance === "circle", ctx_r0.animation === "progress", ctx_r0.animation === "progress-dark", ctx_r0.animation === "pulse"))("ngStyle", ctx_r0.theme);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-valuetext", ctx_r0.loadingText);
} }
class NgxSkeletonLoaderComponent {
    constructor() {
        this.count = 1;
        this.loadingText = 'Loading...';
        this.appearance = '';
        this.animation = 'progress';
        // This is required since ngStyle is using `any` as well
        // More details in https://angular.io/api/common/NgStyle
        // tslint:disable-next-line: no-any
        this.theme = {};
        // tslint:disable-next-line: no-any
        this.items = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        Object(perf_marks_marks__WEBPACK_IMPORTED_MODULE_1__["start"])('NgxSkeletonLoader:Rendered');
        Object(perf_marks_marks__WEBPACK_IMPORTED_MODULE_1__["start"])('NgxSkeletonLoader:Loaded');
        this.validateInputValues();
    }
    /**
     * @private
     * @return {?}
     */
    validateInputValues() {
        // Checking if it's receiving a numeric value (string having ONLY numbers or if it's a number)
        if (!/^\d+$/.test(`${this.count}`)) {
            // Shows error message only in Development
            if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["isDevMode"])()) {
                console.error(`\`NgxSkeletonLoaderComponent\` need to receive 'count' a numeric value. Forcing default to "1".`);
            }
            this.count = 1;
        }
        this.items.length = this.count;
        /** @type {?} */
        const allowedAnimations = ['progress', 'progress-dark', 'pulse', 'false'];
        if (allowedAnimations.indexOf(String(this.animation)) === -1) {
            // Shows error message only in Development
            if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["isDevMode"])()) {
                console.error(`\`NgxSkeletonLoaderComponent\` need to receive 'animation' as: ${allowedAnimations.join(', ')}. Forcing default to "progress".`);
            }
            this.animation = 'progress';
        }
        if (['circle', ''].indexOf(String(this.appearance)) === -1) {
            // Shows error message only in Development
            if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["isDevMode"])()) {
                console.error(`\`NgxSkeletonLoaderComponent\` need to receive 'appearance' as: circle or empty string. Forcing default to "''".`);
            }
            this.appearance = '';
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // Avoiding multiple calls for the same input in case there's no changes in the fields
        // Checking if the fields that require validation are available and if they were changed
        // In case were not changed, we stop the function. Otherwise, `validateInputValues` will be called.
        if (['count', 'animation', 'appearance'].find((/**
         * @param {?} key
         * @return {?}
         */
        key => changes[key] && (changes[key].isFirstChange() || changes[key].previousValue === changes[key].currentValue)))) {
            return;
        }
        this.validateInputValues();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        Object(perf_marks_marks__WEBPACK_IMPORTED_MODULE_1__["end"])('NgxSkeletonLoader:Rendered');
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        Object(perf_marks_marks__WEBPACK_IMPORTED_MODULE_1__["end"])('NgxSkeletonLoader:Loaded');
    }
}
NgxSkeletonLoaderComponent.ɵfac = function NgxSkeletonLoaderComponent_Factory(t) { return new (t || NgxSkeletonLoaderComponent)(); };
NgxSkeletonLoaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NgxSkeletonLoaderComponent, selectors: [["ngx-skeleton-loader"]], inputs: { count: "count", loadingText: "loadingText", appearance: "appearance", animation: "animation", theme: "theme" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 1, vars: 1, consts: [["class", "loader", "aria-busy", "true", "aria-valuemin", "0", "aria-valuemax", "100", "role", "progressbar", "tabindex", "0", 3, "ngClass", "ngStyle", 4, "ngFor", "ngForOf"], ["aria-busy", "true", "aria-valuemin", "0", "aria-valuemax", "100", "role", "progressbar", "tabindex", "0", 1, "loader", 3, "ngClass", "ngStyle"]], template: function NgxSkeletonLoaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, NgxSkeletonLoaderComponent_span_0_Template, 1, 8, "span", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.items);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgStyle"]], styles: [".loader[_ngcontent-%COMP%]{box-sizing:border-box;overflow:hidden;position:relative;background:no-repeat #eff1f6;border-radius:4px;width:100%;height:20px;display:inline-block;margin-bottom:10px;will-change:transform}.loader[_ngcontent-%COMP%]:after, .loader[_ngcontent-%COMP%]:before{box-sizing:border-box}.loader.circle[_ngcontent-%COMP%]{width:40px;height:40px;margin:5px;border-radius:50%}.loader.progress[_ngcontent-%COMP%], .loader.progress-dark[_ngcontent-%COMP%]{transform:translate3d(0,0,0)}.loader.progress-dark[_ngcontent-%COMP%]:after, .loader.progress-dark[_ngcontent-%COMP%]:before, .loader.progress[_ngcontent-%COMP%]:after, .loader.progress[_ngcontent-%COMP%]:before{box-sizing:border-box}.loader.progress-dark[_ngcontent-%COMP%]:before, .loader.progress[_ngcontent-%COMP%]:before{-webkit-animation:2s ease-in-out infinite progress;animation:2s ease-in-out infinite progress;background-size:200px 100%;position:absolute;z-index:1;top:0;left:0;width:200px;height:100%;content:\"\"}.loader.progress[_ngcontent-%COMP%]:before{background-image:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.6),rgba(255,255,255,0))}.loader.progress-dark[_ngcontent-%COMP%]:before{background-image:linear-gradient(90deg,transparent,rgba(0,0,0,.2),transparent)}.loader.pulse[_ngcontent-%COMP%]{-webkit-animation:1.5s cubic-bezier(.4,0,.2,1) infinite pulse;animation:1.5s cubic-bezier(.4,0,.2,1) infinite pulse;-webkit-animation-delay:.5s;animation-delay:.5s}@media (prefers-reduced-motion:reduce){.loader.progress[_ngcontent-%COMP%], .loader.progress-dark[_ngcontent-%COMP%], .loader.pulse[_ngcontent-%COMP%]{-webkit-animation:none;animation:none}.loader.progress[_ngcontent-%COMP%], .loader.progress-dark[_ngcontent-%COMP%]{background-image:none}}@-webkit-keyframes progress{0%{transform:translate3d(-200px,0,0)}100%{transform:translate3d(calc(200px + 100vw),0,0)}}@keyframes progress{0%{transform:translate3d(-200px,0,0)}100%{transform:translate3d(calc(200px + 100vw),0,0)}}@-webkit-keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}"], changeDetection: 0 });
NgxSkeletonLoaderComponent.propDecorators = {
    count: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    loadingText: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    appearance: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    animation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    theme: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxSkeletonLoaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ngx-skeleton-loader',
                template: "<span\n  *ngFor=\"let item of items\"\n  class=\"loader\"\n  aria-busy=\"true\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n  [attr.aria-valuetext]=\"loadingText\"\n  role=\"progressbar\"\n  tabindex=\"0\"\n  [ngClass]=\"{\n    circle: appearance === 'circle',\n    progress: animation === 'progress',\n    'progress-dark': animation === 'progress-dark',\n    pulse: animation === 'pulse'\n  }\"\n  [ngStyle]=\"theme\"\n>\n</span>\n",
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                styles: [".loader{box-sizing:border-box;overflow:hidden;position:relative;background:no-repeat #eff1f6;border-radius:4px;width:100%;height:20px;display:inline-block;margin-bottom:10px;will-change:transform}.loader:after,.loader:before{box-sizing:border-box}.loader.circle{width:40px;height:40px;margin:5px;border-radius:50%}.loader.progress,.loader.progress-dark{transform:translate3d(0,0,0)}.loader.progress-dark:after,.loader.progress-dark:before,.loader.progress:after,.loader.progress:before{box-sizing:border-box}.loader.progress-dark:before,.loader.progress:before{-webkit-animation:2s ease-in-out infinite progress;animation:2s ease-in-out infinite progress;background-size:200px 100%;position:absolute;z-index:1;top:0;left:0;width:200px;height:100%;content:\"\"}.loader.progress:before{background-image:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.6),rgba(255,255,255,0))}.loader.progress-dark:before{background-image:linear-gradient(90deg,transparent,rgba(0,0,0,.2),transparent)}.loader.pulse{-webkit-animation:1.5s cubic-bezier(.4,0,.2,1) infinite pulse;animation:1.5s cubic-bezier(.4,0,.2,1) infinite pulse;-webkit-animation-delay:.5s;animation-delay:.5s}@media (prefers-reduced-motion:reduce){.loader.progress,.loader.progress-dark,.loader.pulse{-webkit-animation:none;animation:none}.loader.progress,.loader.progress-dark{background-image:none}}@-webkit-keyframes progress{0%{transform:translate3d(-200px,0,0)}100%{transform:translate3d(calc(200px + 100vw),0,0)}}@keyframes progress{0%{transform:translate3d(-200px,0,0)}100%{transform:translate3d(calc(200px + 100vw),0,0)}}@-webkit-keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}"]
            }]
    }], function () { return []; }, { count: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], loadingText: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], appearance: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], animation: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], theme: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-skeleton-loader.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxSkeletonLoaderModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgxSkeletonLoaderModule,
        };
    }
}
NgxSkeletonLoaderModule.ɵfac = function NgxSkeletonLoaderModule_Factory(t) { return new (t || NgxSkeletonLoaderModule)(); };
NgxSkeletonLoaderModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: NgxSkeletonLoaderModule });
NgxSkeletonLoaderModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](NgxSkeletonLoaderModule, { declarations: function () { return [NgxSkeletonLoaderComponent]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]]; }, exports: function () { return [NgxSkeletonLoaderComponent]; } }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxSkeletonLoaderModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [NgxSkeletonLoaderComponent],
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
                exports: [NgxSkeletonLoaderComponent]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-skeleton-loader.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-skeleton-loader.js.map

/***/ })

}]);
//# sourceMappingURL=default~error-handling-error-handing-module~http-errors-http-error-module~lazy-loading-components-la~31eb2066.js.map
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {ElementRef} from '@angular/core';
import {Platform, normalizePassiveListenerOptions} from '@angular/cdk/platform';
import {isFakeMousedownFromScreenReader} from '@angular/cdk/a11y';
import {coerceElement} from '@angular/cdk/coercion';
import {setTimeout} from '../../rx-angular-pocs/cdk/utils/zone-agnostic/browser';
import { getZoneUnPatchedApi } from '../../rx-angular-pocs/cdk/utils/zone-agnostic';


/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** Possible states for a ripple element. */
export const enum RippleState {
  FADING_IN, VISIBLE, FADING_OUT, HIDDEN
}

export interface RippleConfig {
  color?: string;
  centered?: boolean;
  radius?: number;
  persistent?: boolean;
  animation?: RippleAnimationConfig;
  terminateOnPointerUp?: boolean;
}

/**
 * Interface that describes the configuration for the animation of a ripple.
 * There are two animation phases with different durations for the ripples.
 */
export interface RippleAnimationConfig {
  /** Duration in milliseconds for the enter animation (expansion from point of contact). */
  enterDuration?: number;
  /** Duration in milliseconds for the exit animation (fade-out). */
  exitDuration?: number;
}


// let isTouch: boolean;

/**
 * Reference to a previously launched ripple element.
 */
export class RippleRef {

  /** Current state of the ripple. */
  state: RippleState = RippleState.HIDDEN;

  constructor(
    private _renderer: {fadeOutRipple(ref: RippleRef): void},
    /** Reference to the ripple HTML element. */
    public element: HTMLElement,
    /** Ripple configuration used for the ripple. */
    public config: RippleConfig
  ) {
  }

  /** Fades out the ripple element. */
  fadeOut() {
    this._renderer.fadeOutRipple(this);
  }
}

/**
 * Default ripple animation configuration for ripples without an explicit
 * animation config specified.
 */
export const defaultRippleAnimationConfig = {
  enterDuration: 450,
  exitDuration: 400
};

/**
 * Timeout for ignoring mouse events. Mouse events will be temporary ignored after touch
 * events to avoid synthetic mouse events.
 */
const ignoreMouseEventsTimeout = 800;

/** Options that apply to all the event listeners that are bound by the ripple renderer. */
const passiveEventOptions = normalizePassiveListenerOptions({passive: true});

/** Events that signal that the pointer is down. ['mousedown', 'touchstart']*/
let pointerDownEvents;

/** Events that signal that the pointer is up. */
const pointerUpEvents = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];

/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * @docs-private
 */
export class RippleRenderer implements EventListenerObject {
  /** Element where the ripples are being added to. */
  private _containerElement: HTMLElement;

  /** Element which triggers the ripple elements on mouse events. */
  private _triggerElement: HTMLElement | null;

  /** Whether the pointer is currently down or not. */
  private _isPointerDown = false;

  /** Set of currently active ripple references. */
  private _activeRipples = new Set<RippleRef>();

  /** Latest non-persistent ripple that was triggered. */
  private _mostRecentTransientRipple: RippleRef | null;

  /** Time in milliseconds when the last touchstart event happened. */
  private _lastTouchStartEvent: number;

  /** Whether pointer-up event listeners have been registered. */
  private _pointerUpEventsRegistered = false;

  /**
   * Cached dimensions of the ripple container. Set when the first
   * ripple is shown and cleared once no more ripples are visible.
   */
  private _containerRect: ClientRect | null;

  constructor(elementOrElementRef: HTMLElement | ElementRef<HTMLElement>, platform: Platform) {

    // Only do anything if we're on the browser.
    if (platform.isBrowser) {
      this._containerElement = coerceElement(elementOrElementRef);
    }

    // detect touch support
    if(pointerDownEvents === undefined) {
      const s = touchOrMouseSupport(platform);
      if(s === -1) {  // mouse only
        pointerDownEvents = ['mousedown']
      }
      else if(s === 0) { // touch only
        pointerDownEvents = ['touchstart']

      }
      else { // both (1)
        pointerDownEvents = ['mousedown', 'touchstart']
      }
    }
  }

  /**
   * Fades in a ripple at the given coordinates.
   * @param x Coordinate within the element, along the X axis at which to start the ripple.
   * @param y Coordinate within the element, along the Y axis at which to start the ripple.
   * @param config Extra ripple options.
   */
  fadeInRipple(x: number, y: number, config: RippleConfig = {}): RippleRef {
    const containerRect = this._containerRect =
      this._containerRect || this._containerElement.getBoundingClientRect();
    const animationConfig = {...defaultRippleAnimationConfig, ...config.animation};

    if (config.centered) {
      x = containerRect.left + containerRect.width / 2;
      y = containerRect.top + containerRect.height / 2;
    }

    const radius = config.radius || distanceToFurthestCorner(x, y, containerRect);
    const offsetX = x - containerRect.left;
    const offsetY = y - containerRect.top;
    const duration = animationConfig.enterDuration;

    const ripple = document.createElement('div');
    ripple.classList.add('mat-ripple-element');

    ripple.style.left = `${offsetX - radius}px`;
    ripple.style.top = `${offsetY - radius}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.width = `${radius * 2}px`;

    // If a custom color has been specified, set it as inline style. If no color is
    // set, the default color will be applied through the ripple theme styles.
    if (config.color != null) {
      ripple.style.backgroundColor = config.color;
    }

    ripple.style.transitionDuration = `${duration}ms`;

    this._containerElement.appendChild(ripple);

    // By default the browser does not recalculate the styles of dynamically created
    // ripple elements. This is critical because then the `scale` would not animate properly.
    enforceStyleRecalculation(ripple);

    ripple.style.transform = 'scale(1)';

    // Exposed reference to the ripple that will be returned.
    const rippleRef = new RippleRef(this, ripple, config);

    rippleRef.state = RippleState.FADING_IN;

    // Add the ripple reference to the list of all active ripples.
    this._activeRipples.add(rippleRef);

    if (!config.persistent) {
      this._mostRecentTransientRipple = rippleRef;
    }

    // Wait for the ripple element to be completely faded in.
    // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
    setTimeout(() => {
      const isMostRecentTransientRipple = rippleRef === this._mostRecentTransientRipple;

      rippleRef.state = RippleState.VISIBLE;

      // When the timer runs out while the user has kept their pointer down, we want to
      // keep only the persistent ripples and the latest transient ripple. We do this,
      // because we don't want stacked transient ripples to appear after their enter
      // animation has finished.
      if (!config.persistent && (!isMostRecentTransientRipple || !this._isPointerDown)) {
        rippleRef.fadeOut();
      }
    }, duration);

    return rippleRef;
  }

  /** Fades out a ripple reference. */
  fadeOutRipple(rippleRef: RippleRef) {
    const wasActive = this._activeRipples.delete(rippleRef);

    if (rippleRef === this._mostRecentTransientRipple) {
      this._mostRecentTransientRipple = null;
    }

    // Clear out the cached bounding rect if we have no more ripples.
    if (!this._activeRipples.size) {
      this._containerRect = null;
    }

    // For ripples that are not active anymore, don't re-run the fade-out animation.
    if (!wasActive) {
      return;
    }

    const rippleEl = rippleRef.element;
    const animationConfig = {...defaultRippleAnimationConfig, ...rippleRef.config.animation};

    rippleEl.style.transitionDuration = `${animationConfig.exitDuration}ms`;
    rippleEl.style.opacity = '0';
    rippleRef.state = RippleState.FADING_OUT;

    // Once the ripple faded out, the ripple can be safely removed from the DOM.
    setTimeout(() => {
      rippleRef.state = RippleState.HIDDEN;
      rippleEl.parentNode!.removeChild(rippleEl);
    }, animationConfig.exitDuration);
  }

  /** Fades out all currently active ripples. */
  fadeOutAll() {
    this._activeRipples.forEach(ripple => ripple.fadeOut());
  }

  /** Sets up the trigger event listeners */
  setupTriggerEvents(elementOrElementRef: HTMLElement | ElementRef<HTMLElement>) {
    const element = coerceElement(elementOrElementRef);

    if (!element || element === this._triggerElement) {
      return;
    }

    // Remove all previously registered event listeners from the trigger element.
    this._removeTriggerEvents();

    this._triggerElement = element;

    this._registerEvents(pointerDownEvents);
  }

  /**
   * Handles all registered events.
   * @docs-private
   */
  handleEvent(event: Event) {
    if (event.type === 'mousedown') {
      this._onMousedown(event as MouseEvent);
    } else if (event.type === 'touchstart') {
      this._onTouchStart(event as TouchEvent);
    } else {
      this._onPointerUp();
    }

    // If pointer-up events haven't been registered yet, do so now.
    // We do this on-demand in order to reduce the total number of event listeners
    // registered by the ripples, which speeds up the rendering time for large UIs.
    if (!this._pointerUpEventsRegistered) {
      this._registerEvents(pointerUpEvents);
      this._pointerUpEventsRegistered = true;
    }
  }

  /** Function being called whenever the trigger is being pressed using mouse. */
  private _onMousedown(event: MouseEvent) {
    // Screen readers will fire fake mouse events for space/enter. Skip launching a
    // ripple in this case for consistency with the non-screen-reader experience.
    const isFakeMousedown = isFakeMousedownFromScreenReader(event);
    const isSyntheticEvent = this._lastTouchStartEvent &&
      Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;

    if (!isFakeMousedown && !isSyntheticEvent) {
      this._isPointerDown = true;
      this.fadeInRipple(event.clientX, event.clientY);
    }
  }

  /** Function being called whenever the trigger is being pressed using touch. */
  private _onTouchStart(event: TouchEvent) {
      // Some browsers fire mouse events after a `touchstart` event. Those synthetic mouse
      // events will launch a second ripple if we don't ignore mouse events for a specific
      // time after a touchstart event.
      this._lastTouchStartEvent = Date.now();
      this._isPointerDown = true;

      // Use `changedTouches` so we skip any touches where the user put
      // their finger down, but used another finger to tap the element again.
      const touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        this.fadeInRipple(touches[i].clientX, touches[i].clientY);
      }
  }

  /** Function being called whenever the trigger is being released. */
  private _onPointerUp() {
    if (!this._isPointerDown) {
      return;
    }

    this._isPointerDown = false;

    // Fade-out all ripples that are visible and not persistent.
    this._activeRipples.forEach(ripple => {
      // By default, only ripples that are completely visible will fade out on pointer release.
      // If the `terminateOnPointerUp` option is set, ripples that still fade in will also fade out.
      const isVisible = ripple.state === RippleState.VISIBLE ||
        ripple.config.terminateOnPointerUp && ripple.state === RippleState.FADING_IN;

      if (!ripple.config.persistent && isVisible) {
        ripple.fadeOut();
      }
    });
  }

  /** Registers event listeners for a given list of events. */
  private _registerEvents(eventTypes: string[]) {
      eventTypes.forEach((type) => {
        if(this._triggerElement) {
          getZoneUnPatchedApi('addEventListener', this._triggerElement)(type, this, passiveEventOptions)
          //this._triggerElement!.addEventListener(type, this, passiveEventOptions);
        }
      });
  }

  /** Removes previously registered event listeners from the trigger element. */
  _removeTriggerEvents() {
    if (this._triggerElement) {
      pointerDownEvents.forEach((type) => {
        getZoneUnPatchedApi('removeEventListener', this._triggerElement)(type, this, passiveEventOptions);
       // this._triggerElement!.removeEventListener(type, this, passiveEventOptions);
      });

      if (this._pointerUpEventsRegistered) {
        pointerUpEvents.forEach((type) => {
          getZoneUnPatchedApi('removeEventListener', this._triggerElement)(type, this, passiveEventOptions)
         // this._triggerElement!.removeEventListener(type, this, passiveEventOptions);
        });
      }
    }
  }

}

/** Enforces a style recalculation of a DOM element by computing its styles. */
function enforceStyleRecalculation(element: HTMLElement) {
  // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
  // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
  // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
  window.getComputedStyle(element).getPropertyValue('opacity');
}

/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 */
function distanceToFurthestCorner(x: number, y: number, rect: ClientRect) {
  const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
  const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
  return Math.sqrt(distX * distX + distY * distY);
}


/**
 * Returns a 3 state value
 * only touch support: -1
 * only mouse support: 0
 * touch and mouse support: 1
 *
 * @param platform
 *
 * @return supported interaction
 */
function touchOrMouseSupport(platform: Platform): -1 | 0 | 1 {
  //if (window.PointerEvent && ('maxTouchPoints' in navigator)) {
  if (platform.BLINK) {
    // if Pointer Events are supported, just check maxTouchPoints
    if (navigator.maxTouchPoints > 0) {
      return 1;
    }
  } else {
    // no Pointer Events...
    if (window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches) {
      // check for any-pointer:coarse which mostly means touchscreen
      return 1;
    } else if (window.TouchEvent || ('ontouchstart' in window)) {
      // last resort - check for exposed touch events API / event handler
      return 1;
    }
  }
  return 0;
}

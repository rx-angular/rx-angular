import { SchedulingPriority, staticSchedule } from '@rx-angular/template';
import {
  ɵdetectChanges as detectChanges,
  ɵmarkDirty as markDirty
} from '@angular/core';
import { animationFrameTick } from '../rxjs/scheduling/animationFrameTick';

function staticRenderChanges(
  ref: HTMLElement,
  options: {
    parent?: boolean;
    scheduleCD?: false | SchedulingPriority;
    afterCD?: () => void;
  }
): AbortController {
  const abortController = new AbortController();

  if (options.parent) {
    if (options.scheduleCD) {
      // We assume the requestedAnimationFrame is shared and therefore know#
      // if this finishes the rendering is also done
      animationFrameTick().subscribe(() => {
        if (!abortController.signal.aborted) {
          // @NOTICE markDirty will get scheduled on animation frame at the root component
          markDirty(ref);
          options.afterCD();
        }
      });

      return abortController;
    }
    if (!abortController.signal.aborted) {
      markDirty(ref);
      options.afterCD();
    }
    return abortController;
  }

  if (options.scheduleCD) {
    staticSchedule(() => {
      if (!abortController.signal.aborted) {
        detectChanges(ref);
        options.afterCD();
      }
    }, options.scheduleCD);
    return abortController;
  }

  detectChanges(ref);
  options.afterCD();
  return abortController;
}

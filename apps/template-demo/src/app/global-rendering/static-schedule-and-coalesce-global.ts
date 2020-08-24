import { from } from 'rxjs';
import { staticCoalesce } from '@rx-angular/template';
import { globalTaskManager, GlobalTaskPriority } from './global-task-manager';

export function coalesceAndScheduleGlobal(
    work: () => void,
    priority: GlobalTaskPriority,
    scope: object = {},
    abC: AbortController = new AbortController()
): AbortController {
    const durationSelector = from(Promise.resolve());

    const scheduledWork = () => staticScheduleGlobal(work, priority, abC);

    const coalesceAbC = staticCoalesce(
        scheduledWork,
        durationSelector,
        scope,
        abC
    );

    const abortHandler = function() {
        coalesceAbC.abort();
        abC.signal.removeEventListener('abort', abortHandler, false);
    };
    abC.signal.addEventListener('abort', abortHandler, false);

    return abC;
}

function staticScheduleGlobal(
    task: () => void,
    priority: GlobalTaskPriority,
    abC: AbortController = new AbortController()
): AbortController {
    const scheduledWork = {
        work: () => {
            if (!abC.signal.aborted) {
                task();
            }
        },
        priority
    };
    globalTaskManager.scheduleTask(scheduledWork);
    const abortHandler = function() {
        globalTaskManager.deleteTask(scheduledWork);
        abC.signal.removeEventListener('abort', abortHandler, false);
    };
    abC.signal.addEventListener('abort', abortHandler, false);

    return abC;
}

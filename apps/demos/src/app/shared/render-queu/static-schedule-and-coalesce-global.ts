import { globalTaskManager, GlobalTaskPriority, GlobalTaskScope } from './global-task-manager';

export function coalesceAndScheduleGlobal(
    work: () => void,
    priority: GlobalTaskPriority,
    scope: object = {},
    abC: AbortController = new AbortController()
): AbortController {
    return staticScheduleGlobal(work, scope, priority, abC);
}

function staticScheduleGlobal(
    task: () => void,
    scope: GlobalTaskScope,
    priority: GlobalTaskPriority,
    abC: AbortController = new AbortController()
): AbortController {
    const scheduledWork = {
        work: () => {
            if (!abC.signal.aborted) {
                task();
            }
        },
        scope,
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

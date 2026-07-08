import { eventTargets, setupTargets } from './zone-events';
import { disableGlobalAPIs, globalAPIs } from './zone-global-aps';

disableGlobalAPIs(globalAPIs);
setupTargets(eventTargets);

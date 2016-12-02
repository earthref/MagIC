import {createApp} from 'mantra-core';
import initContext from './configs/context';

// Import the client modules.
import erModule from './modules/er';
import germModule from './modules/germ';
import magicModule from './modules/magic';
import sbnModule from './modules/sbn';
import femoModule from './modules/femo';
import sccModule from './modules/scc';
import ereseModule from './modules/erese';

// Initialize the client context.
const context = initContext();

// Create the client application.
const app = createApp(context);
app.loadModule(erModule);
app.loadModule(germModule);
app.loadModule(magicModule);
app.loadModule(sbnModule);
app.loadModule(femoModule);
app.loadModule(sccModule);
app.loadModule(ereseModule);
app.init();

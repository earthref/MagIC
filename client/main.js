import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import erModule from './modules/er';
import germModule from './modules/germ';
import magicModule from './modules/magic';
import sbnModule from './modules/sbn';
import femoModule from './modules/femo';
import sccModule from './modules/scc';
import ereseModule from './modules/erese';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(erModule);
app.loadModule(germModule);
app.loadModule(magicModule);
app.loadModule(sbnModule);
app.loadModule(femoModule);
app.loadModule(sccModule);
app.loadModule(ereseModule);
app.init();

import $ from 'dom7';
import Framework7 from './framework7-custom.js';

// Import F7 Styles
import '../css/framework7-custom.less';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';


// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';

// Import main app component
import App from '../app.f7';


var app = new Framework7({
  name: 'sevsu', // App name
  theme: 'ios', // Automatic theme detection
  el: '#app', // App root element
  component: App, // App main component

  // App store
  store: store,
  touch: {
    // tapHold: true, //enable tap hold events
    mdTouchRipple: true,
    iosTouchRipple: true,
    auroraTouchRipple: true,
    disableContextMenu: true,
    touchRippleElements: `.ripple`
  },
  // App routes
  routes: routes,
  // Register service worker (only on production build)
  serviceWorker: process.env.NODE_ENV === 'production' ? {
    path: '/service-worker.js',
  } : {},
});
window.app = app;
window.state = store.state;

import * as XLSX from 'xlsx/xlsx.mjs';
window.XLSXam = XLSX
window.XLSXamr = XLSX.read
window.XLSXamu = XLSX.utils



if (app.device.prefersColorScheme() == 'dark') {
  document.body.classList.add('theme-dark');
  document.getElementById('theme').setAttribute('content', '#101010')
}


import * as exports from './globalVars';
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);







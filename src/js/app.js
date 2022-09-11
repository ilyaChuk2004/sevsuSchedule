import $ from 'dom7';
import Framework7 from './framework7-custom.js';
window.q=$
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
    disableContextMenu: false,
    touchRippleElements: `.ripple`
  },
  view: {
    browserHistory:true,
    stackPages: true,
    browserHistorySeparator: '#',

    // browserHistoryRoot:'i',
    iosSwipeBack: true

  },
  // App routes
  routes: routes,
  // Register service worker (only on production build)
  serviceWorker: process.env.NODE_ENV === 'production' ? {
    path: '/service-worker.js',
  } : {},
});

export { app, }


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

import { s_check_version } from './s-check-version'; s_check_version(30000)

if (localStorage.last && navigator.onLine && new Date(+localStorage.last).getDate()!==new Date().getDate()) {
  setTimeout(() => {
    q('.page-content').scrollTop(0, 400);
    setTimeout(() => {
      app.emit('e-refresh')
    }, 500);
  }, 2000);
}

import lodash from 'lodash'
window._=lodash

//отменяет перетаскивание мышкой ссылок и картинок
$(document).on('dragstart', 'img, a', function (event) { event.preventDefault() })

$(document).on('contextmenu', 'a, img, video', (e) => {
			e.preventDefault()
			e.stopPropagation();
			return false;
	})

let lastTheme = app.device.prefersColorScheme()
setInterval(() => {
  if (app.device.prefersColorScheme()=='light') {
    document.body.classList.remove('theme-dark')
  } else {
    document.body.classList.add('theme-dark')
  }

  if (lastTheme != app.device.prefersColorScheme()) {
    lastTheme=app.device.prefersColorScheme()
    app.emit('e-theme-change', lastTheme)
  }
}, 1000);



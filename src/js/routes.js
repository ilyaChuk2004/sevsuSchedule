
import HomePage from '../pages/home.f7';
import bell from '../pages/bell.f7';
import settings from '../pages/settings.f7';

import { $ } from 'dom7';
import Framework7 from 'framework7/bundle';
import { group } from './globalVars';


let transition = () => {
  if (Framework7.device == 'desktop' || Framework7.device == 'ipad' || window.innerWidth >= 750) {
    return 'f7-circle'
  }
  else {
    return 'f7-parallax'
  }
}

let defPopup = {
  closeOnEscape: true,
  swipeToClose: 'to-bottom',
  on: {
    open: (e) => {
    },
    opened: (e) => {
      let backdrop = document.querySelector('.popup-backdrop')
      backdrop.classList.add('opened')
      $(e.$el[0]).find('.page-content').css('display', 'block')
      setTimeout(() => {
        $(e.$el[0]).find('.page-content').css('opacity', '1')
      }, 10);


    },
    close: (e) => {
      let backdrop = document.querySelector('.popup-backdrop')
      try {
        backdrop.classList.remove('opened')
      } catch (error) {
        
      }
      
    },
    closed: (e) => {
      let backdrop = document.querySelector('.popup-backdrop')
      try {
        backdrop.style.transition = ''
        backdrop.classList.remove('opened')
      } catch (error) {
        
      }

      if (e.route.path=="/settings/") {
        if (state.appData.group.name!=group) {
          setInterval(() => {
            localStorage.force = 1
            localStorage.group = JSON.stringify(state.appData.group)
            window.location.replace(window.location.href)
            window.location.replace(window.location.href)
            window.location.replace(window.location.href)
            window.location.replace(window.location.href)
          }, 200);
        }
      }
    }
  }
}


var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/bell/',
    options: {
      transition: transition(),
    },
    popup: {
      component: bell,
      swipeHandler: '#bellViewHandler',
      ...defPopup
    }
  },
  {
    path: '/settings/',
    options: {
      transition: transition(),
    },
    popup: {
      component: settings,
      swipeHandler: '#settingsViewHandler',
      ...defPopup
    }
  },
];

export default routes;
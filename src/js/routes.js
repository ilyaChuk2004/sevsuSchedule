
import HomePage from '../pages/home.f7';
import bell from '../pages/bell.f7';

import { $ } from 'dom7';
import Framework7 from 'framework7/bundle';

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
      backdrop.classList.remove('opened')
    },
    closed: (e) => {
      let backdrop = document.querySelector('.popup-backdrop')
      backdrop.style.transition = ''
      backdrop.classList.remove('opened')
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
];

export default routes;

import { createStore } from 'framework7';

const store = createStore({
  state: {
    appData: {
      url:"sevsu.ichuk.ru"
    },
    gf: {
      vibrate(ms) {
        /**
             * Вибрация
             * @param {number | array} ms длительность вибрации 
             */
        if (typeof (ms) == 'string') {
          switch (ms) {
            case 'step':
              ms = [22]
              break
            case 'lil success':
              ms = [15, 8, 30]
              break
            case 'big success':
              ms = [20, 10, 25, 10, 30]
              break
            case 'success':
              ms = [15, 7, 20, 7, 20]
              break
            case 'big fail':
              ms = [20, 8, 20, 8, 20, 50, 20]
              break
            case 'fail':
              ms = [30, 8, 20, 100, 30]
              break
            case 'warn':
              ms = [20, 20, 20, 20, 20, 90, 20]
              break

            default:
              break
          }

        }
        const canVibrate = window.navigator.vibrate
        window.navigator.vibrate(ms)
      },
    }
  },
  getters: {
    products({ state }) {
      return state.products;
    }
  },
  actions: {
    addProduct({ state }, product) {
      state.products = [...state.products, product];
    },
  },
})
export default store;

import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import throttle from './utils/throttle'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

// // 图片懒加载
// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload)

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   loading: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABACAAAAAB5S6uaAAAAsklEQVR4Ae3SQQ6CMBCFYe9/wULppEOKhCYQKODeyhhdYOozcTn/wsxL/FblcvsxBQoUKPgDSNejhIJkiXNkEwaSZTlYRAmMfU7+L+KxxwKoiJnDe4c8qSoAMz+POcbXab6DlY1zhlcU7M6vWXm3g6Bv9sM1PQhokDUQCKpJ1lSDgKKsSCDoSBZ1INhsu+Xf1m7oOyxUe1/TAr2DNMonhAMJABxOcQnE8KF4BnAKFChQcAcRDG63hVeTsAAAAABJRU5ErkJggg==',
//   attempt: 1
// })
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$throttle = throttle
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

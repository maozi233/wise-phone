// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
import 'mint-ui/lib/style.css'

Vue.use(VueLazyLoad, {
  loading: require('./assets/images/ajax-loader.gif'),
  error: require('./assets/images/default.png')
})
Vue.use(Mint)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const ENV = process.env
  console.log(`从${from.path} 到 ${to.path}`)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem(ENV.USER_KEY)) {
      next()
    } else {
      next({
        path: '/login?target=login'
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

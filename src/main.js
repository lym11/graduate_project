// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import './common/stylus/index.styl'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
/* eslint-disable no-new */

/* router.beforeEach((to, from, next) => {
  console.log('123')
  next()
}) */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

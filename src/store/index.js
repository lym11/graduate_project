import Vue from 'vue'
import Vuex from 'vuex'
import home from './module/home'
import user from './module/user'
import location from './module/location'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  strict: debug,
  state: {},
  modules: {
    home,
    location,
    user
  }
})

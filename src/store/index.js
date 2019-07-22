import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import player from './modules/player'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    player
  },
  getters
})

export default store

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/style/index.scss'

import '@/permission.js'

import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(Antd)

Vue.use(VueLazyLoad, {
  error: require('../static/img/loading.gif'),
  loading: require('../static/img/loading.gif')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from "@/components/layout.vue"
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: 'home',
          component: () => import('@/views/home/index')
        },
        {
          path: 'ranking-list',
          component: () => import('@/views/rankingList/index')
        }
      ]
    }
  ]
})

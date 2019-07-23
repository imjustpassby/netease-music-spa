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
          name: 'home',
          component: () => import('@/views/home/index')
        },
        {
          path: 'ranking-list',
          name: 'ranking-list',
          component: () => import('@/views/rankingList/index')
        },
        {
          path: 'playlist',
          name: 'playlist',
          component: () => import('@/views/playlist/index')
        },
        {
          path: 'dj-radios',
          name: "dj-radios",
          component: () => import('@/views/dj/index')
        },
        {
          path: 'new-album',
          name: 'new-album',
          component: () => import('@/views/newAlbum/index')
        },
        {
          path: 'artist',
          name: 'artist',
          component: () => import('@/views/artist/index')
        },
        {
          path: '/my',
          name: 'my',
          component: () => import('@/views/myMusic/index')
        },
        {
          path: '/album-detail',
          name: 'album-detail',
          component: () => import('@/views/albumDetail/index')
        },
        {
          path: '/playlist-detail',
          name: 'playlist-detail',
          component: () => import('@/views/playListDetail/index')
        }
      ]
    }
  ]
})

import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import Cookie from 'js-cookie'
// 创建axios实例
const service = axios.create()

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.loginSuccess) { //解决多用户登录问题，每次请求前设置登录后返回的cookie
      let cookie = window.sessionStorage.getItem("cookie");
      Cookie.set("MUSIC_U", JSON.parse(cookie).MUSIC_U);
      Cookie.set("__csrf", JSON.parse(cookie).__csrf);
      Cookie.set("__remember_me", JSON.parse(cookie).__remember_me);
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    if (store.getters.loginSuccess) {//每次请求借宿后删除cookie
      Cookie.remove("MUSIC_U");
      Cookie.remove("__csrf");
      Cookie.remove("__remember_me");
    }
    const res = response.data
    return Promise.resolve(res);
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response.status == 504) {
      Vue.prototype.$message.warning("服务器错误...");
    } else if (error.response.status == 301) {
      Vue.prototype.$message.warning("请登录之后再体验该功能喔...");
    }
    
    return Promise.reject(error);
    // return Promise.reject(error)
  }
)

export default service

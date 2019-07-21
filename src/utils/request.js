import axios from 'axios'
import Vue from 'vue'
// 创建axios实例
const service = axios.create()

// request拦截器
service.interceptors.request.use(
  config => {
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
    const res = response.data
    return Promise.resolve(res);
  },
  error => {
    console.log('err' + error) // for debug
    Vue.prototype.$message.warning("请登录之后再体验该功能喔...");
    return Promise.reject("请登录之后再体验该功能喔...");
    // return Promise.reject(error)
  }
)

export default service

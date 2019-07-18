import request from '@/utils/request'

export function loginCellphone(data) {
  return request({
    url: '/api/login/cellphone',
    withCredentials: true,
    params: {
      phone: data.phone,
      password: data.password
    }
  })
}

export function loginRefresh() {
  return request({
    url: '/api/login/refresh',
    withCredentials: true
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    withCredentials: true
  })
}

export function loginStatus() {
  return request({
    url: '/api/login/status',
    withCredentials: true
  })
}

export function userDetail(data) {
  return request({
    url: '/api/user/detail',
    withCredentials: true,
    params: {
      uid: data.uid
    }
  })
}

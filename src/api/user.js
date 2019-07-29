import request from "@/utils/request"

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
/* 获取用户详情 */
export function userDetail(data) {
  return request({
    url: '/api/user/detail',
    withCredentials: true,
    params: {
      uid: data.uid
    }
  })
}
/* 获取用户信息 , 歌单，收藏，mv, dj 数量 */
export function getUserSubCount(data) {
  return request({
    url: '/api//user/subcount',
    withCredentials: true,
  })
}
/* 获取用户歌单 */
export function getUserPlaylist(data) {
  return request({
    url: '/api//user/playlist',
    withCredentials: true,
    params: {
      uid: data
    }
  })
}
/* 获取用户播放记录 */
export function getUserRecord(data) {
  return request({
    url: '/api//user/record',
    withCredentials: true,
    params: {
      uid: data.uid,
      type: data.type
    }
  })
}
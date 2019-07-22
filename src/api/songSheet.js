import request from "@/utils/request.js"

/*获取歌单 ( 网友精选碟 )  */
export function getPlayList(data) {
  return request({
    url: '/api/top/playlist',
    withCredentials: true,
    param: {
      limit: 20,
      cat: data? data:''
    }
  })
}
/* 获取精品歌单 */
export function getPlaylistHighQuality(data) {
  return request({
    url: '/api/playlist/highquality',
    withCredentials: true,
    param: {
      before: data.before? data.before : ''
    }
  })
}
/*相关歌单推荐  */
export function getRelatedPlaylist(data) {
  return request({
    url: '/api/related/playlist',
    withCredentials: true,
    param: {
      id: data
    }
  })
}
/* 获取歌单详情 */
export function getPlaylistDetail(data) {
  return request({
    url: '/api/playlist/detail',
    withCredentials: true,
    param: {
      id: data
    }
  })
}
import request from "@/utils/request.js"

/*歌单分类（全部）  */
export function getPlayListCatlist() {
  return request({
    url: '/api/playlist/catlist',
    withCredentials: true
  })
}
/* 热门歌单分类 */
export function getPlayListHot() {
  return request({
    url: '/api/playlist/hot',
    withCredentials: true
  })
}
/*获取歌单 ( 网友精选碟 )  */
export function getPlayList(data) {
  return request({
    url: '/api/top/playlist',
    withCredentials: true,
    params: {
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
    params: {
      before: data.before? data.before : ''
    }
  })
}
/*相关歌单推荐  */
export function getRelatedPlaylist(data) {
  return request({
    url: '/api/related/playlist',
    withCredentials: true,
    params: {
      id: data
    }
  })
}
/* 获取歌单详情 */
export function getPlaylistDetail(data) {
  return request({
    url: '/api/playlist/detail',
    withCredentials: true,
    params: {
      id: data
    }
  })
}
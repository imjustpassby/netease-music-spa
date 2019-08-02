import request from "@/utils/request.js";
/* 获取歌曲URL */
export function getSongUrl(data) {
  return request({
    url: '/api/song/url',
    withCredentials: true,
    params: {
      id: data
    }
  })
}
/* 获取歌词 */
export function getLyric(data) {
  return request({
    url: '/api/lyric',
    withCredentials: true,
    params: {
      id: data
    }
  })
}
/* 音乐是否可用 */
export function checkMusic(data) {
  return request({
    url: '/api/check/music',
    withCredentials: true,
    params: {
      id: data
    }
  })
}
/* 歌曲评论 */
export function getCommentMusic(data) {
  return request({
    url: '/api/comment/music',
    withCredentials: true,
    params: {
      id: data,
      limit: 30
    }
  })
}
/* 获取每日推荐歌曲(需要登录) */
export function getRecommendSongs() {
  return request({
    url: '/api/recommend/songs',
    withCredentials: true
  })
}
/* 获取相似歌曲 */
export function getSimilarSong(data) {
  return request({
    url: '/api/simi/song',
    withCredentials: true,
    params: {
      id: data
    }
  })
}
/* 获取歌曲详情 */
export function getSongDetail(data) {
  return request({
    url: '/api/song/detail',
    withCredentials: true,
    params: {
      ids: data
    }
  })
}
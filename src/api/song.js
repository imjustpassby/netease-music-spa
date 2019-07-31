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
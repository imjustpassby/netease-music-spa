import request from '@/utils/request'
/* banner */
export function getBanner() {
  return request({
    url: '/api/banner',
    withCredentials: true
  }) 
}
/* 每日推荐歌曲 */
export function getRecommendSongs() {
  return request({
    url: '/api/recommend/songs',
    withCredentials: true
  })
}
/* 推荐mv */
export function getPersonalizedMv() {
  return request({
    url: '/api/personalized/mv',
    withCredentials: true
  })
}
/* 推荐歌单 */
export function getPersonalized() {
  return request({
    url: '/api/personalized',
    withCredentials: true
  })
}
/* 推荐新音乐 */
export function getPersonalizedNewSong() {
  return request({
    url: '/api/personalized/newsong',
    withCredentials: true
  })
}
/* 推荐电台 */
export function getPersonalizedDJProgram() {
  return request({
    url: '/api/personalized/djprogram',
    withCredentials: true
  })
}
/* 独家放送 */
export function getPersonalizedPrivateContent() {
  return request({
    url: '/api/personalized/privatecontent',
    withCredentials: true
  })
}
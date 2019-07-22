import request from "@/utils/request.js"

/* 电台推荐 */
export function getDjRecommend() {
  return request({
    url: '/api/dj/recommend',
    withCredentials: true
  })
}
/* 今日电台推荐 */
export function getTodayDj() {
  return request({
    url: '/api/dj/today/perfered',
    withCredentials: true
  })
}
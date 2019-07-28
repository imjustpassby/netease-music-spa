import request from "@/utils/request.js"

/* 电台推荐 */
export function getDjRecommend() {
  return request({
    url: '/api/dj/recommend',
    withCredentials: true
  })
}
/* 推荐节目 */
export function getProgramRecommend() {
  return request({
    url: '/api/program/recommend',
    withCredentials: true
  })
}
/* 电台分类 */
export function getDjCateList() {
  return request({
    url: '/api/dj/catelist',
    withCredentials: true
  })
}
/* 电台分类推荐 */
export function getDjRecommendType(data) {
  return request({
    url: '/api/dj/recommend/type',
    withCredentials: true,
    params: {
      type: data
    }
  })
}
/* 今日电台推荐 */
export function getTodayDj() {
  return request({
    url: '/api/dj/today/perfered',
    withCredentials: true
  })
}
/* 电台详情 */
export function getDjDetail(data) {
  return request({
    url: '/api/dj/detail',
    withCredentials: true,
    params: {
      rid: data
    }
  })
}
/* 电台节目 */
export function getDjProgram(data) {
  return request({
    url: '/api/dj/program',
    withCredentials: true,
    params: {
      rid: data.rid,
      limit: data.limit
    }
  })
}
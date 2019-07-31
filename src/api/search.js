import request from "@/utils/request"

/* 搜索 */
export function searchSuggest(data) {
  return request({
    url: '/api/search/suggest',
    withCredentials: true,
    params: {
      keywords: data
    }
  })
}

/* 搜索多重匹配 */
export function searchMultimatch(data) {
  return request({
    url: '/api/search/multimatch',
    withCredentials: true,
    params: {
      keywords: data
    }
  })
}